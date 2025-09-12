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

const GenerateAiHealthSummaryInputSchema = z.object({
  vitalsData: z.string().describe('The patient vitals data as a JSON string.'),
});
export type GenerateAiHealthSummaryInput = z.infer<typeof GenerateAiHealthSummaryInputSchema>;

const GenerateAiHealthSummaryOutputSchema = z.object({
  summary: z.string().describe('The AI-generated health summary.'),
});
export type GenerateAiHealthSummaryOutput = z.infer<typeof GenerateAiHealthSummaryOutputSchema>;

export const generateAiHealthSummary = cache(
  async (
    input: GenerateAiHealthSummaryInput
  ): Promise<GenerateAiHealthSummaryOutput> => {
    return generateAiHealthSummaryFlow(input);
  }
);

const prompt = ai.definePrompt({
  name: 'generateAiHealthSummaryPrompt',
  input: {schema: GenerateAiHealthSummaryInputSchema},
  output: {schema: GenerateAiHealthSummaryOutputSchema},
  prompt: `You are an AI health assistant.  Given the following patient vitals data, generate a concise and informative summary of the patient's overall health status and trends.

Vitals Data: {{{vitalsData}}}`,
});

const generateAiHealthSummaryFlow = ai.defineFlow(
  {
    name: 'generateAiHealthSummaryFlow',
    inputSchema: GenerateAiHealthSummaryInputSchema,
    outputSchema: GenerateAiHealthSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
