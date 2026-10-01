// Markdown → HTML at build time for case studies and guides.
// Headings get stable ids (and never render as h1), raw HTML is escaped, HTML comments
// (e.g. VERIFY notes) are dropped, and external links open in a new tab safely.
import { Marked, type Tokens } from 'marked';

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&[a-z#0-9]+;/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const stripTags = (s: string) => s.replace(/<[^>]+>/g, '');

export function renderMarkdown(md: string): { html: string; headings: Heading[] } {
  const headings: Heading[] = [];
  const used = new Map<string, number>();
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth }: Tokens.Heading) {
        const inner = this.parser.parseInline(tokens);
        const text = stripTags(inner);
        const base = slugify(text) || 'section';
        const seen = used.get(base) ?? 0;
        used.set(base, seen + 1);
        const id = seen ? `${base}-${seen + 1}` : base;
        const level = Math.min(Math.max(depth, 2), 4);
        if (level === 2 || level === 3) headings.push({ id, text, level });
        return `<h${level} id="${id}">${inner}</h${level}>\n`;
      },
      link({ href, title, tokens }: Tokens.Link) {
        const text = this.parser.parseInline(tokens);
        const titleAttr = title ? ` title="${escapeHtml(title)}"` : '';
        if (/^https?:\/\//.test(href)) {
          return `<a href="${escapeHtml(href)}"${titleAttr} target="_blank" rel="noopener">${text}<span class="sr-only"> (opens in a new tab)</span></a>`;
        }
        return `<a href="${escapeHtml(href)}"${titleAttr}>${text}</a>`;
      },
      html({ text }: Tokens.HTML | Tokens.Tag) {
        return escapeHtml(text);
      },
    },
  });
  const source = md.replace(/<!--[\s\S]*?-->/g, '');
  const html = marked.parse(source, { async: false }) as string;
  return { html, headings };
}

/** Visible word count of rendered HTML (for content-length checks). */
export const wordCount = (html: string) => stripTags(html).split(/\s+/).filter(Boolean).length;
