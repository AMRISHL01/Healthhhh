
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-ai-health-summaries.ts';
import '@/ai/flows/ai-generated-recommendations-for-doctors.ts';
import '@/ai/flows/categorize-health-risk.ts';
