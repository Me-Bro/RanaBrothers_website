// Build-time access to Markdown bodies under content/ (server components only).
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const readContentFile = (...segments: string[]) => readFileSync(join(process.cwd(), 'content', ...segments), 'utf8');
