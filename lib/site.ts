// Identity facts used by metadata, structured data, llms.txt and the footer.
export const site = {
  name: 'Rana Brothers',
  url: 'https://ranabrothers.online',
  descriptor: 'Software & AI Studio',
  description:
    'Rana Brothers plans, builds and looks after web apps, mobile apps and AI products for startups and growing businesses.',
  disambiguatingDescription:
    'Software, mobile app and AI development studio founded by David Singh Rana and Vibhanshu Rana in Uttarakhand, India.',
  // VERIFY: hello@ranabrothers.online must receive mail (MX records + mailbox) before launch
  email: 'hello@ranabrothers.online',
  locality: 'Khatima',
  region: 'Uttarakhand',
  country: 'IN',
  locale: 'en_IN',
  /** Rana Brothers' own profiles only (company LinkedIn page, the studio's GitHub org) once they exist. */
  sameAs: [] as string[],
} as const;

export const absoluteUrl = (path: string) => (path === '/' ? site.url : `${site.url}${path}`);
