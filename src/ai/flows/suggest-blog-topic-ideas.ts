'use server';

/**
 * @fileOverview Suggests blog topic ideas and titles relevant to data analysis.
 *
 * - suggestBlogTopicIdeas - A function that suggests blog topic ideas and titles.
 * - SuggestBlogTopicIdeasInput - The input type for the suggestBlogTopicIdeas function.
 * - SuggestBlogTopicIdeasOutput - The return type for the suggestBlogTopicIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestBlogTopicIdeasInputSchema = z.object({
  expertise: z
    .string()
    .describe(
      'The area of expertise of the person writing the blog, e.g. data analysis, machine learning.'
    ),
  interests: z
    .string()
    .describe(
      'The specific interests of the person writing the blog, e.g. data visualization, predictive modeling.'
    ),
  style: z
    .string()
    .describe(
      'The desired writing style for the blog, e.g. technical, beginner-friendly, humorous.'
    ),
});
export type SuggestBlogTopicIdeasInput = z.infer<typeof SuggestBlogTopicIdeasInputSchema>;

const SuggestBlogTopicIdeasOutputSchema = z.object({
  topicIdeas: z
    .array(z.string())
    .describe('An array of blog topic ideas.'),
  titleSuggestions: z
    .array(z.string())
    .describe('An array of suggested titles for each blog topic.'),
});
export type SuggestBlogTopicIdeasOutput = z.infer<typeof SuggestBlogTopicIdeasOutputSchema>;

export async function suggestBlogTopicIdeas(
  input: SuggestBlogTopicIdeasInput
): Promise<SuggestBlogTopicIdeasOutput> {
  return suggestBlogTopicIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestBlogTopicIdeasPrompt',
  input: {schema: SuggestBlogTopicIdeasInputSchema},
  output: {schema: SuggestBlogTopicIdeasOutputSchema},
  prompt: `You are a blog idea generator for data analysis topics.

You will generate an array of blog topic ideas and an array of suggested titles for each blog topic.

The blog should be written by someone with expertise in {{{expertise}}}, interests in {{{interests}}}, and a writing style that is {{{style}}}.

Blog Topic Ideas:
{{topicIdeas}}

Title Suggestions:
{{titleSuggestions}}`,
});

const suggestBlogTopicIdeasFlow = ai.defineFlow(
  {
    name: 'suggestBlogTopicIdeasFlow',
    inputSchema: SuggestBlogTopicIdeasInputSchema,
    outputSchema: SuggestBlogTopicIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
