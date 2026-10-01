import { test } from 'node:test';
import assert from 'node:assert/strict';
import { binaryStrings, denylistHashes, findHits } from '../../scripts/brand-guard.mjs';

// Synthetic terms only: the real denylist must never appear in tests (public repo).
const salt = 'test-salt';
const cfg = {
  salt,
  maxWords: 4,
  hashes: new Set([...denylistHashes('Acme Widget Co', salt), ...denylistHashes('9876543210', salt), ...denylistHashes('919876543210', salt)]),
};

test('detects a multi-word term in every common spelling', () => {
  for (const s of ['Acme Widget Co', 'acme-widget-co', 'AcmeWidgetCo', 'ACME_WIDGET_CO', 'see acmewidgetco.com', 'mail info@acmewidgetco.com']) {
    assert.equal(findHits(s, cfg).length > 0, true, s);
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
