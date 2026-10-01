export type FounderId = 'david' | 'vibhanshu';

export interface Founder {
  id: FounderId;
  name: string;
  firstName: string;
  role: string;
  /** JSON-LD @id of the Person node declared on the founder's own site. */
  personId: string;
  url: string;
  aboutUrl: string;
  bio: string;
}

export const founders: Record<FounderId, Founder> = {
  vibhanshu: {
    id: 'vibhanshu',
    name: 'Vibhanshu Rana',
    firstName: 'Vibhanshu',
    role: 'Co-Founder & CTO',
    personId: 'https://vibhanshu.ranabrothers.online/#person',
    url: 'https://vibhanshu.ranabrothers.online',
    aboutUrl: 'https://vibhanshu.ranabrothers.online',
    // VERIFY: Vibhanshu confirms this bio and title, and adds the #person @id to his own site
    bio: 'Vibhanshu leads engineering. His stack spans Python, Ruby on Rails, Node.js and React/Next.js, and he builds retrieval-augmented AI systems on vector search, among them CloudDocSense, which answers questions from documents and shows its sources. MCA, NIT Raipur.',
  },
  david: {
    id: 'david',
    name: 'David Singh Rana',
    firstName: 'David',
    role: 'Co-Founder & COO',
    personId: 'https://david.ranabrothers.online/#person',
    url: 'https://david.ranabrothers.online',
    aboutUrl: 'https://david.ranabrothers.online/about',
    bio: 'David leads strategy, client relationships and delivery, and works hands-on across backend, DevOps and AI features. His products include DuSu, a voice-first AI coach for spoken English used by 200+ people, and Edge Verify, which tests trading strategies against eight years of NSE price data at five-minute resolution before any money is at risk.',
  },
};

export const founderList: Founder[] = [founders.vibhanshu, founders.david];
