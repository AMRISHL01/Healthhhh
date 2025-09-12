
'use server';
/**
 * @fileOverview Generates AI-driven text summaries of patient health data.
 *
 * - generateAiHealthSummary - A function that generates the AI health summary.
 * - GenerateAiHealthSummaryInput - The input type for the generateAiHealthSummary function.
 * - GenerateAiHealthSummaryOutput - The return type for the generateAiHealthSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {cache} from 'react';
import {
  categorizeHealthRisk,
  type CategorizeHealthRiskInput,
} from './categorize-health-risk';

const GenerateAiHealthSummaryInputSchema = z.object({
  vitalsData: z.string().describe('The patient vitals data as a JSON string.'),
});
export type GenerateAiHealthSummaryInput = z.infer<
  typeof GenerateAiHealthSummaryInputSchema
>;

const GenerateAiHealthSummaryOutputSchema = z.object({
  summary: z.string().describe('The AI-generated health summary.'),
});
export type GenerateAiHealthSummaryOutput = z.infer<
  typeof GenerateAiHealthSummaryOutputSchema
>;

export const generateAiHealthSummary = cache(
  async (
    input: GenerateAiHealthSummaryInput
  ): Promise<GenerateAiHealthSummaryOutput> => {
    return generateAiHealthSummaryFlow(input);
  }
);

const prompt = ai.definePrompt({
  name: 'generateAiHealthSummaryPrompt',
  input: {
    schema: z.object({
      vitalsData: GenerateAiHealthSummaryInputSchema.shape.vitalsData,
      riskAnalysis: z.object({
        riskCategory: z.enum(['Normal', 'Warning', 'Critical']),
        justification: z.string(),
      }),
    }),
  },
  output: {schema: GenerateAiHealthSummaryOutputSchema},
  prompt: `You are an AI health assistant. Given the following patient vitals data and a pre-computed risk analysis, generate a concise and informative summary of the patient's overall health status and trends.

Focus on the justification provided in the risk analysis to guide your summary.

Risk Analysis:
- Category: {{{riskAnalysis.riskCategory}}}
- Justification: {{{riskAnalysis.justification}}}

Vitals Data: {{{vitalsData}}}`,
});

const generateAiHealthSummaryFlow = ai.defineFlow(
  {
    name: 'generateAiHealthSummaryFlow',
    inputSchema: GenerateAiHealthSummaryInputSchema,
    outputSchema: GenerateAiHealthSummaryOutputSchema,
  },
  async ({vitalsData}) => {
    const vitals = JSON.parse(vitalsData);
    const riskInput: CategorizeHealthRiskInput = {
      vitals: vitals.slice(0, 10), // Use the last 10 readings for risk analysis
    };
    const riskAnalysis = await categorizeHealthRisk(riskInput);

    const {output} = await prompt({
      vitalsData,
      riskAnalysis,
    });
    return output!;
  }
);
