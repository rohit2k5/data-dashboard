'use server';

/**
 * @fileOverview AI-powered project description generator and improver.
 *
 * - suggestProjectDescriptions - A function that suggests descriptions and improvements for data analysis projects.
 * - SuggestProjectDescriptionsInput - The input type for the suggestProjectDescriptions function.
 * - SuggestProjectDescriptionsOutput - The return type for the suggestProjectDescriptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestProjectDescriptionsInputSchema = z.object({
  projectName: z.string().describe('The name of the data analysis project.'),
  existingDescription: z.string().describe('The existing description of the project.'),
  projectDetails: z.string().describe('Additional details about the project, such as technologies used and key findings.'),
});
export type SuggestProjectDescriptionsInput = z.infer<typeof SuggestProjectDescriptionsInputSchema>;

const SuggestProjectDescriptionsOutputSchema = z.object({
  suggestedDescription: z.string().describe('The suggested description for the project.'),
  improvementSuggestions: z.string().describe('Suggestions for improving the project or its presentation.'),
});
export type SuggestProjectDescriptionsOutput = z.infer<typeof SuggestProjectDescriptionsOutputSchema>;

export async function suggestProjectDescriptions(input: SuggestProjectDescriptionsInput): Promise<SuggestProjectDescriptionsOutput> {
  return suggestProjectDescriptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestProjectDescriptionsPrompt',
  input: {schema: SuggestProjectDescriptionsInputSchema},
  output: {schema: SuggestProjectDescriptionsOutputSchema},
  prompt: `You are an AI assistant helping Rohit Mirge, a data analyst, create compelling descriptions for his project portfolio.

  Based on the project's name, existing description, and additional details, suggest a new description that is engaging, informative, and highlights the key achievements and technologies used. Also, provide improvement suggestions for the project itself, focusing on potential enhancements and presentation strategies.

Project Name: {{{projectName}}}
Existing Description: {{{existingDescription}}}
Project Details: {{{projectDetails}}}


Here's how the output should be formatted:

{
  "suggestedDescription": "A detailed and captivating project description.",
  "improvementSuggestions": "Actionable suggestions to enhance the project and its presentation."
}
`,
});

const suggestProjectDescriptionsFlow = ai.defineFlow(
  {
    name: 'suggestProjectDescriptionsFlow',
    inputSchema: SuggestProjectDescriptionsInputSchema,
    outputSchema: SuggestProjectDescriptionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
