import type { ContactContent } from '@/content/types';

export const contact: ContactContent = {
  intro:
    'Tell us what you want to build, who it is for and any deadline you are working towards. A few honest lines are enough to start, and we will ask for the rest.',
  nextSteps: [
    {
      title: 'We read your message',
      // VERIFY: reply time (within one business day)
      body: 'We read every message and aim to reply within one business day.',
    },
    {
      title: 'We reply with questions or a call',
      body: 'If we can help, we reply with a few questions or suggest a short call to understand the problem properly. If we are not the right fit, we say so plainly.',
    },
    {
      title: 'We send a written scope',
      body: 'After we have talked, we write down what we understood as a scope and project estimate for you to read, question and compare. Nothing starts until you have agreed to it.',
    },
  ],
};
