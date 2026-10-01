import { describe, expect, it } from 'vitest';
import { renderMarkdown } from '@/lib/markdown';

describe('renderMarkdown', () => {
  it('gives h2/h3 headings unique slug ids and lists them', () => {
    const { html, headings } = renderMarkdown('## The problem\n\ntext\n\n### Key decision\n\n## The problem\n');
    expect(html).toContain('<h2 id="the-problem">The problem</h2>');
    expect(html).toContain('<h3 id="key-decision">Key decision</h3>');
    expect(html).toContain('<h2 id="the-problem-2">');
    expect(headings.map((h) => h.id)).toEqual(['the-problem', 'key-decision', 'the-problem-2']);
  });

  it('never emits an h1', () => {
    expect(renderMarkdown('# Title\n').html).toContain('<h2 id="title">');
  });

  it('escapes raw HTML instead of rendering it', () => {
    const { html } = renderMarkdown('Hello <script>alert(1)</script>\n');
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('drops HTML comments such as VERIFY notes', () => {
    const { html } = renderMarkdown('Text <!-- VERIFY: confirm --> more\n');
    expect(html).not.toContain('VERIFY');
  });

  it('opens external links in a new tab with noopener, and leaves internal links alone', () => {
    const { html } = renderMarkdown('[a](https://example.com) and [b](/services)\n');
    expect(html).toContain('href="https://example.com" target="_blank" rel="noopener"');
    expect(html).toContain('<a href="/services">b</a>');
  });

  it('renders GFM tables', () => {
    expect(renderMarkdown('| A | B |\n|---|---|\n| 1 | 2 |\n').html).toContain('<table>');
  });
});
