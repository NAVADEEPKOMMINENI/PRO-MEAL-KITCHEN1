'use server';

import { intelligentMealRecommendations } from '@/ai/flows/intelligent-meal-recommendations';
import { z } from 'zod';

const FormSchema = z.object({
  dietaryPreferences: z.string(),
  healthGoals: z.string(),
  pastOrderHistory: z.string(),
});

export async function handleMealRecommendation(prevState: any, formData: FormData) {
  try {
    const validatedFields = FormSchema.safeParse({
      dietaryPreferences: formData.get('dietaryPreferences'),
      healthGoals: formData.get('healthGoals'),
      pastOrderHistory: formData.get('pastOrderHistory'),
    });

    if (!validatedFields.success) {
      return {
        message: 'Invalid form data.',
        recommendations: null,
      };
    }

    const result = await intelligentMealRecommendations(validatedFields.data);

    return {
      message: 'success',
      recommendations: result.mealRecommendations,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred.',
      recommendations: null,
    };
  }
}
