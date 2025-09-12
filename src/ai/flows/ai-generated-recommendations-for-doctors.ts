
'use server';

/**
 * @fileOverview Generates AI-driven care recommendations for doctors based on patient vitals.
 *
 * - generateCareRecommendation - A function that generates a care recommendation for a patient.
 * - GenerateCareRecommendationInput - The input type for the generateCareRecommendation function.
 * - GenerateCareRecommendationOutput - The return type for the generateCareRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCareRecommendationInputSchema = z.object({
  patientId: z.string().describe('The ID of the patient.'),
  heartRate: z.number().describe('The patient\'s heart rate in BPM.'),
  spo2: z.number().describe('The patient\'s SpO2 level as a percentage.'),
  temperature: z.number().describe('The patient\'s temperature in Celsius.'),
});
export type GenerateCareRecommendationInput = z.infer<
  typeof GenerateCareRecommendationInputSchema
>;

const GenerateCareRecommendationOutputSchema = z.object({
  recommendation: z.string().describe('The AI-generated care recommendation.'),
});
export type GenerateCareRecommendationOutput = z.infer<
  typeof GenerateCareRecommendationOutputSchema
>;

export async function generateCareRecommendation(
  input: GenerateCareRecommendationInput
): Promise<GenerateCareRecommendationOutput> {
  return generateCareRecommendationFlow(input);
}


const prompt = ai.definePrompt({
  name: 'generateCareRecommendationPrompt',
  input: {schema: GenerateCareRecommendationInputSchema},
  output: {schema: GenerateCareRecommendationOutputSchema},
  prompt: `You are an AI assistant that provides actionable recommendations for doctors based on patient vitals. Your response should be a single, concise sentence.

  Given the following patient vitals, generate a clear and direct care recommendation.
  - If vitals are critical (e.g., very high heart rate, low SpO2), suggest immediate action.
  - If vitals are slightly off, suggest a follow-up or monitoring.

  Patient ID: {{{patientId}}}
  Heart Rate: {{{heartRate}}} BPM
  SpO2: {{{spo2}}}%
  Temperature: {{{temperature}}}°C
  `,
});

const generateCareRecommendationFlow = ai.defineFlow(
  {
    name: 'generateCareRecommendationFlow',
    inputSchema: GenerateCareRecommendationInputSchema,
    outputSchema: GenerateCareRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
