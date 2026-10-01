import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { JsonLd } from '@/components/seo/JsonLd';

describe('<JsonLd>', () => {
  it('renders a JSON-LD script and escapes "<" so content cannot close the tag', () => {
    const html = renderToStaticMarkup(<JsonLd data={{ '@context': 'https://schema.org', name: '</script><b>x' }} />);
    expect(html.startsWith('<script type="application/ld+json">')).toBe(true);
    expect(html).not.toContain('</script><b>');
    expect(html).toContain('\\u003c/script>');
  });
});
