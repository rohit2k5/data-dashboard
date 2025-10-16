'use server';

/**
 * @fileOverview A LinkedIn profile scraper and profile generator AI agent.
 *
 * - generateProfileFromLinkedIn - A function that handles the profile generation process.
 * - GenerateProfileFromLinkedInInput - The input type for the generateProfileFromLinkedIn function.
 * - GenerateProfileFromLinkedInOutput - The return type for the generateProfileFromLinkedIn function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProfileFromLinkedInInputSchema = z.object({
  linkedinProfileUrl: z
    .string()
    .describe('The URL of the LinkedIn profile to scrape.'),
});
export type GenerateProfileFromLinkedInInput = z.infer<typeof GenerateProfileFromLinkedInInputSchema>;

const GenerateProfileFromLinkedInOutputSchema = z.object({
  profileSummary: z
    .string()
    .describe('A summary of the LinkedIn profile, including skills, experience, and education.'),
});
export type GenerateProfileFromLinkedInOutput = z.infer<typeof GenerateProfileFromLinkedInOutputSchema>;

export async function generateProfileFromLinkedIn(
  input: GenerateProfileFromLinkedInInput
): Promise<GenerateProfileFromLinkedInOutput> {
  return generateProfileFromLinkedInFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProfileFromLinkedInPrompt',
  input: {schema: GenerateProfileFromLinkedInInputSchema},
  output: {schema: GenerateProfileFromLinkedInOutputSchema},
  prompt: `You are an expert in summarizing LinkedIn profiles.

  You will be provided with a LinkedIn profile URL. You will scrape the profile and summarize the skills, experience, and education of the person.

  LinkedIn Profile URL: {{{linkedinProfileUrl}}}`,
});

const generateProfileFromLinkedInFlow = ai.defineFlow(
  {
    name: 'generateProfileFromLinkedInFlow',
    inputSchema: GenerateProfileFromLinkedInInputSchema,
    outputSchema: GenerateProfileFromLinkedInOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
