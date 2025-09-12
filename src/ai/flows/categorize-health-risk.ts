'use server';

/**
 * @fileOverview Analyzes patient vitals to categorize health risk.
 *
 * - categorizeHealthRisk - A function that analyzes vitals and returns a risk category.
 * - CategorizeHealthRiskInput - The input type for the categorizeHealthRisk function.
 * - CategorizeHealthRiskOutput - The return type for the categorizeHealthRisk function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { Vital } from '@/lib/types';

const CategorizeHealthRiskInputSchema = z.object({
  vitals: z
    .array(
      z.object({
        date: z.string(),
        heartRate: z.number(),
        spo2: z.number(),
        temperature: z.number(),
      })
    )
    .describe('An array of the last 5-10 vital readings for a patient.'),
});
export type CategorizeHealthRiskInput = z.infer<
  typeof CategorizeHealthRiskInputSchema
>;

const CategorizeHealthRiskOutputSchema = z.object({
  riskCategory: z
    .enum(['Normal', 'Warning', 'Critical'])
    .describe('The categorized risk level for the patient.'),
  justification: z
    .string()
    .describe(
      'A brief justification for why the patient was placed in this risk category.'
    ),
});
export type CategorizeHealthRiskOutput = z.infer<
  typeof CategorizeHealthRiskOutputSchema
>;

export async function categorizeHealthRisk(
  input: CategorizeHealthRiskInput
): Promise<CategorizeHealthRiskOutput> {
  return categorizeHealthRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeHealthRiskPrompt',
  input: { schema: CategorizeHealthRiskInputSchema },
  output: { schema: CategorizeHealthRiskOutputSchema },
  prompt: `You are an expert medical AI that analyzes patient vital signs to determine health risks.
  
  Analyze the following series of recent vital readings for a patient.
  
  Vitals Data:
  {{#each vitals}}
  - Date: {{date}}, Heart Rate: {{heartRate}} bpm, SpO2: {{spo2}}%, Temperature: {{temperature}}°C
  {{/each}}
  
  Use the following rules to determine a risk category:
  1.  **Thresholds**:
      - Heart Rate > 100 bpm is high.
      - SpO2 < 94% is low.
      - Temperature > 38°C indicates a fever.
  
  2.  **Trend Analysis**:
      - If vitals are consistently abnormal across multiple readings, the risk is likely 'Critical'.
      - A one-time abnormal reading might be a 'Warning'.
      - If all vitals are within normal ranges, the risk is 'Normal'.
      
  Based on your analysis of the trends and thresholds in the data, categorize the patient's risk as 'Normal', 'Warning', or 'Critical' and provide a concise justification for your decision.`,
});

const categorizeHealthRiskFlow = ai.defineFlow(
  {
    name: 'categorizeHealthRiskFlow',
    inputSchema: CategorizeHealthRiskInputSchema,
    outputSchema: CategorizeHealthRiskOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
