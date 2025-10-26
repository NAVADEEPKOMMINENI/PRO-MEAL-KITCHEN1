import type { LucideIcon } from 'lucide-react';

export interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

export interface Restaurant {
  id: number;
  name: string;
  imageId: string;
  rating: number;
  distance: string;
  cuisine: string;
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
}

export interface Meal {
  id: number;
  name: string;
  imageId: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  type: 'Breakfast' | 'Lunch' | 'Snacks' | 'Dinner';
}

export interface UserProfile {
  name: string;
  email: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other' | '';
  dietaryPreferences: string;
  allergies: string;
  healthGoals: string;
}
