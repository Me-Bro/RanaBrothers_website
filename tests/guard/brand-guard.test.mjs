import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { binaryStrings, denylistHashes, findHits } from '../../scripts/brand-guard.mjs';
// Newer exports are reached through the namespace so one missing export fails only its own test.
import * as guard from '../../scripts/brand-guard.mjs';

// Synthetic terms only: the real denylist must never appear in tests (public repo).
const salt = 'test-salt';
const cfg = {
  salt,
  maxWords: 4,
  hashes: new Set([...denylistHashes('Acme Widget Co', salt), ...denylistHashes('9876543210', salt), ...denylistHashes('919876543210', salt)]),
};

test('detects a multi-word term in every common spelling', () => {
  for (const s of [
    'Acme Widget Co', 'acme-widget-co', 'AcmeWidgetCo', 'ACME_WIDGET_CO', 'see acmewidgetco.com', 'mail info@acmewidgetco.com',
    // Mixed spellings only match through the joined form of a token window (the n-gram path).
    'Acme WidgetCo', 'AcmeWidget Co', 'Acme-WidgetCo', 'acme.widgetco', 'AcmeWidget-Co',
  ]) {
    assert.equal(findHits(s, cfg).length > 0, true, s);
  }
});

test('detects a four-word term in mixed spellings, and not a shorter prefix of it', () => {
  const four = { salt, maxWords: 4, hashes: new Set(denylistHashes('Acme Widget Co Ltd', salt)) };
  for (const s of ['Acme Widget Co Ltd', 'Acme WidgetCo Ltd', 'ACME WIDGET CO LTD', 'AcmeWidget CoLtd', 'acme-widget-co-ltd', 'AcmeWidgetCoLtd']) {
    assert.equal(findHits(s, four).length > 0, true, s);
  }
  for (const s of ['Acme Widget Co', 'Widget Co Ltd', 'Acme Widget Ltd']) {
    assert.deepEqual(findHits(s, four), [], s);
  }
});

test('ignores partial words and unrelated text', () => {
  for (const s of ['Acme', 'widget co-op', 'Acme widgets company', 'We build web apps', 'aGVsbG8rYWNtZXdpZGdldGNv']) {
    assert.deepEqual(findHits(s, cfg), [], s);
  }
});

test('detects phone numbers with or without spacing and country code', () => {
  for (const s of ['+91 98765 43210', '98765-43210', 'wa.me/919876543210', 'tel:+919876543210']) {
    assert.equal(findHits(s, cfg).length > 0, true, s);
  }
});

test('reports the 1-based line number and never the matched text', () => {
  const hits = findHits('line one\nline two\nby Acme Widget Co\n', cfg);
  assert.equal(hits[0].line, 3);
  assert.equal(hits[0].hash.length, 8);
  assert.equal(JSON.stringify(hits).toLowerCase().includes('acme'), false);
});

test('finds terms embedded in binary metadata', () => {
  const buf = Buffer.concat([Buffer.from([0, 255, 3, 7]), Buffer.from('tEXtTitle\0AcmeWidgetCo logo'), Buffer.from([0, 1, 2])]);
  assert.equal(findHits(binaryStrings(buf), cfg).length > 0, true);
});

// --- Item 6: windows span line breaks, markup is also scanned as visible text ---------------------
test('a term split across line breaks is found, on the line of its first word', () => {
  assert.deepEqual(findHits('Acme\nWidget Co', cfg).map((h) => h.line), [1]);
  assert.deepEqual(findHits('first\nAcme Widget\nCo\nlast', cfg).map((h) => h.line), [2]);
  assert.deepEqual(findHits('Acme\r\nWidget\r\n\r\nCo', cfg).map((h) => h.line), [1]);
  assert.deepEqual(findHits('Acme\nWidgets Co', cfg), [], 'a different word on the next line is not the term');
});

test('several windows that match on one line still give one hit for that line', () => {
  assert.equal(findHits('Acme Widget Co and AcmeWidgetCo again', cfg).length, 1);
  assert.deepEqual(findHits('Acme Widget Co\nplain\nAcme Widget Co', cfg).map((h) => h.line), [1, 3]);
});

test('visibleText drops tags and comments, decodes entities and keeps the line count', () => {
  assert.equal(guard.visibleText('Acme <b>Widget</b> Co'), 'Acme Widget Co');
  assert.equal(guard.visibleText('Acme&nbsp;Widget&nbsp;Co'), 'Acme Widget Co');
  assert.equal(guard.visibleText('&#65;cme &#x57;idget &amp; Co &lt;3'), 'Acme Widget & Co <3');
  assert.equal(guard.visibleText('a<!-- x\ny -->b\n<p\nclass="c">d'), 'a\nb\n\nd');
  assert.equal(guard.visibleText('<![CDATA[Acme Widget Co]]>'), 'Acme Widget Co');
  assert.equal(guard.visibleText('&constructor; &#x110000; &#xD800; &bogus;'), '&constructor; &#x110000; &#xD800; &bogus;', 'unknown or invalid entities stay as they are');
});

test('markup hides a term from the raw text but not from its visible text', () => {
  for (const markup of ['Acme <b>Widget</b> Co', 'Acme&nbsp;Widget&nbsp;Co', '<p>Acme</p><p>Widget Co</p>', 'Ac<wbr>me Wid<wbr>get Co']) {
    assert.deepEqual(findHits(markup, cfg), [], `raw: ${markup}`);
    assert.equal(findHits(guard.visibleText(markup), cfg).length, 1, `visible: ${markup}`);
  }
});

// --- Item 1: reported paths never contain a matched term ---------------------------------------
test('redactPath replaces every path segment that contains a term', () => {
  assert.equal(guard.redactPath('logo/Acme-Widget-Co.png', cfg), 'logo/***');
  assert.equal(guard.redactPath('out\\AcmeWidgetCo\\a\\b.txt', cfg), 'out/***/a/b.txt');
  assert.equal(guard.redactPath('src/ok/file.txt', cfg), 'src/ok/file.txt');
  assert.equal(guard.redactPath('Acme Widget Co', cfg), '***');
});

test('redactPath hides a term that is split across several segments', () => {
  assert.equal(guard.redactPath('acme/widget/co/file.txt', cfg), '***/***/***/***');
  assert.equal(guard.redactPath('acme-widget/co-logo.txt', cfg), '***/***');
  assert.equal(guard.redactPath('acme/logo.txt', cfg), 'acme/logo.txt', 'a lone word is not a term');
});

// --- Item 2: config validation ------------------------------------------------------------------
const GOOD_CONFIG = { salt: 's', maxWords: 4, hashes: denylistHashes('Acme Widget Co', 's'), allowedAuthorEmails: ['ok@users.noreply.github.com'] };

function withConfigFile(content, fn) {
  const dir = mkdtempSync(join(tmpdir(), 'bg-cfg-'));
  const file = join(dir, 'cfg.json');
  try {
    writeFileSync(file, typeof content === 'string' ? content : JSON.stringify(content));
    return fn(file);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

test('loadConfig returns sets and lower-cases the allowed emails', () => {
  const c = withConfigFile({ ...GOOD_CONFIG, allowedAuthorEmails: ['Ok@Users.Noreply.GitHub.com'] }, (f) => guard.loadConfig(f));
  assert.equal(c.salt, 's');
  assert.equal(c.maxWords, 4);
  assert.equal(c.hashes instanceof Set, true);
  assert.equal(c.hashes.size, GOOD_CONFIG.hashes.length);
  assert.equal(c.allowedEmails.has('ok@users.noreply.github.com'), true);
});

test('loadConfig rejects every invalid field and names it', () => {
  const bad = [
    ['salt', { salt: '' }],
    ['salt', { salt: 5 }],
    ['maxWords', { maxWords: 0 }],
    ['maxWords', { maxWords: 9 }],
    ['maxWords', { maxWords: 2.5 }],
    ['maxWords', { maxWords: '4' }],
    ['hashes', { hashes: [] }],
    ['hashes', { hashes: 'abc' }],
    ['hashes', { hashes: ['abc'] }],
    ['hashes', { hashes: [...GOOD_CONFIG.hashes, 'F'.repeat(24)] }],
    ['allowedAuthorEmails', { allowedAuthorEmails: [] }],
    ['allowedAuthorEmails', { allowedAuthorEmails: 'a@b.c' }],
    ['allowedAuthorEmails', { allowedAuthorEmails: [7] }],
  ];
  for (const [field, patch] of bad) {
    assert.throws(
      () => withConfigFile({ ...GOOD_CONFIG, ...patch }, (f) => guard.loadConfig(f)),
      (err) => err.message === `invalid config (${field})`,
      JSON.stringify(patch),
    );
  }
});

test('loadConfig rejects text that is not a JSON object, and a file that does not exist', () => {
  for (const [text, field] of [['{ nope', 'json'], ['[]', 'root'], ['null', 'root'], ['"str"', 'root']]) {
    assert.throws(() => withConfigFile(text, (f) => guard.loadConfig(f)), (err) => err.message === `invalid config (${field})`, text);
  }
  assert.throws(() => guard.loadConfig(join(tmpdir(), 'bg-definitely-missing-config.json')), (err) => err.message === 'invalid config (file)');
});

// --- Item 5: low-entropy terms live in an optional local config ---------------------------------
const LOCAL_CONFIG = { salt: 's', maxWords: 4, hashes: denylistHashes('Acmo', 's'), allowedAuthorEmails: ['local@users.noreply.github.com'] };

function withTwoConfigs(publicConfig, localConfig, fn) {
  const dir = mkdtempSync(join(tmpdir(), 'bg-cfg2-'));
  try {
    const pub = join(dir, 'public.json');
    const local = join(dir, 'local.json');
    writeFileSync(pub, JSON.stringify(publicConfig));
    writeFileSync(local, typeof localConfig === 'string' ? localConfig : JSON.stringify(localConfig));
    return fn(pub, local);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

test('loadConfig merges an optional local config into the public one', () => {
  const merged = withTwoConfigs(GOOD_CONFIG, { ...LOCAL_CONFIG, maxWords: 6 }, (pub, local) => guard.loadConfig(pub, local));
  assert.equal(merged.hashes.size, GOOD_CONFIG.hashes.length + LOCAL_CONFIG.hashes.length);
  assert.equal(merged.maxWords, 6);
  assert.equal(merged.allowedEmails.has('ok@users.noreply.github.com'), true);
  assert.equal(merged.allowedEmails.has('local@users.noreply.github.com'), true);
});

test('a short term is detected only when the local config is loaded', () => {
  const [publicOnly, merged] = withTwoConfigs(GOOD_CONFIG, LOCAL_CONFIG, (pub, local) => [guard.loadConfig(pub), guard.loadConfig(pub, local)]);
  assert.deepEqual(findHits('made by Acmo', publicOnly), []);
  assert.equal(findHits('made by Acmo', merged).length, 1);
  assert.equal(findHits('made by Acme Widget Co', merged).length, 1, 'the public terms still apply');
});

test('a local config must be valid, readable and use the same salt', () => {
  for (const [local, message] of [
    [{ ...LOCAL_CONFIG, hashes: [] }, 'invalid config (hashes) [local]'],
    [{ ...LOCAL_CONFIG, salt: 'other-salt' }, 'invalid config (salt) [local]'],
    ['{ nope', 'invalid config (json) [local]'],
  ]) {
    assert.throws(() => withTwoConfigs(GOOD_CONFIG, local, (pub, file) => guard.loadConfig(pub, file)), (err) => err.message === message, message);
  }
  assert.throws(
    () => withConfigFile(GOOD_CONFIG, (pub) => guard.loadConfig(pub, join(tmpdir(), 'bg-definitely-missing-local.json'))),
    (err) => err.message === 'invalid config (file) [local]',
  );
});

test('a public config may leave out the salt; the local config supplies it', () => {
  const publicWithoutSalt = { ...GOOD_CONFIG, salt: undefined };
  const merged = withTwoConfigs(publicWithoutSalt, LOCAL_CONFIG, (pub, local) => guard.loadConfig(pub, local));
  assert.equal(merged.salt, 's');
  assert.equal(findHits('made by Acme Widget Co', merged).length, 1, 'the public hashes work with the private salt');
  assert.equal(findHits('made by Acmo', merged).length, 1);
});

test('without a salt, loadConfig reports none and nothing can match', () => {
  const publicWithoutSalt = { ...GOOD_CONFIG, salt: undefined };
  const c = withConfigFile(publicWithoutSalt, (f) => guard.loadConfig(f));
  assert.equal(c.salt, null);
  assert.deepEqual(findHits('made by Acme Widget Co', c), []);
});

test('loadConfig(file) never picks up the local denylist of the machine it runs on', () => {
  const c = withConfigFile(GOOD_CONFIG, (file) => guard.loadConfig(file));
  assert.equal(c.hashes.size, GOOD_CONFIG.hashes.length);
});

// --- The checked-in denylist ---------------------------------------------------------------------
const REPO_DENYLIST = fileURLToPath(new URL('../../scripts/brand-guard.denylist.json', import.meta.url));

test('the checked-in denylist allowlists the maintainer and the GitHub web-flow identity', () => {
  const c = guard.loadConfig(REPO_DENYLIST, null);
  assert.equal(c.allowedEmails.has('78587671+davidrana123@users.noreply.github.com'), true);
  assert.equal(c.allowedEmails.has('noreply@github.com'), true, 'squash merges made on github.com are committed by this identity');
  assert.equal(c.maxWords, 4);
});

test('the checked-in denylist holds nothing a guess can be checked against: hashes, word limit and emails, no salt', () => {
  const raw = JSON.parse(readFileSync(REPO_DENYLIST, 'utf8'));
  assert.deepEqual(Object.keys(raw).sort(), ['allowedAuthorEmails', 'hashes', 'maxWords']);
  assert.equal(raw.hashes.length > 0 && raw.hashes.every((h) => /^[0-9a-f]{24}$/.test(h)), true);
});
