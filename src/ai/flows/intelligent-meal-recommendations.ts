'use server';

/**
 * @fileOverview A flow to provide personalized meal recommendations based on user preferences, health goals, and past order history.
 *
 * - intelligentMealRecommendations - A function that returns meal recommendations.
 * - IntelligentMealRecommendationsInput - The input type for the intelligentMealRecommendations function.
 * - IntelligentMealRecommendationsOutput - The return type for the intelligentMealRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentMealRecommendationsInputSchema = z.object({
  dietaryPreferences: z
    .string()
    .describe("The user's dietary preferences, such as 'vegan', 'keto', or 'high-protein'."),
  healthGoals: z
    .string()
    .describe("The user's health goals, such as 'weight loss', 'muscle gain', or 'maintenance'."),
  pastOrderHistory: z
    .string()
    .describe("A summary of the user's past order history, including the meals they've ordered before."),
});
export type IntelligentMealRecommendationsInput = z.infer<
  typeof IntelligentMealRecommendationsInputSchema
>;

const IntelligentMealRecommendationsOutputSchema = z.object({
  mealRecommendations: z
    .string()
    .describe('A list of meal recommendations based on the user input.'),
});
export type IntelligentMealRecommendationsOutput = z.infer<
  typeof IntelligentMealRecommendationsOutputSchema
>;

export async function intelligentMealRecommendations(
  input: IntelligentMealRecommendationsInput
): Promise<IntelligentMealRecommendationsOutput> {
  return intelligentMealRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentMealRecommendationsPrompt',
  input: {schema: IntelligentMealRecommendationsInputSchema},
  output: {schema: IntelligentMealRecommendationsOutputSchema},
  prompt: `You are a personal nutrition assistant. Based on the user's dietary preferences, health goals, and past order history, you will provide personalized meal recommendations.

Dietary Preferences: {{{dietaryPreferences}}}
Health Goals: {{{healthGoals}}}
Past Order History: {{{pastOrderHistory}}}

Meal Recommendations:`,
});

const intelligentMealRecommendationsFlow = ai.defineFlow(
  {
    name: 'intelligentMealRecommendationsFlow',
    inputSchema: IntelligentMealRecommendationsInputSchema,
    outputSchema: IntelligentMealRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
