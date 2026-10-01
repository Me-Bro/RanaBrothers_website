import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServicePage } from '@/components/content/ServicePage';
import { servicePages } from '@/content/service-pages';
import { pageMeta } from '@/lib/meta';

const PREFIX = '/services/';
type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.filter((s) => s.path.startsWith(PREFIX)).map((s) => ({ slug: s.path.slice(PREFIX.length) }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  return pageMeta(`${PREFIX}${slug}`);
}

export default async function ServiceRoute({ params }: Params) {
  const { slug } = await params;
  const content = servicePages.find((s) => s.path === `${PREFIX}${slug}`);
  if (!content) notFound();
  return <ServicePage content={content} />;
}
