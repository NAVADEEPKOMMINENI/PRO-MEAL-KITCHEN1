import { Home, ClipboardList, Package, User, Utensils, PieChart, ShoppingCart, Contact } from 'lucide-react';
import type { NavLink, Restaurant, Meal, UserProfile } from './types';

export const navLinks: NavLink[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/plan', label: 'My Plan', icon: ClipboardList },
  { href: '/orders', label: 'Orders', icon: Package },
  { href: '/profile', label: 'Profile', icon: User },
];

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: 'The Green Bowl',
    imageId: 'restaurant1',
    rating: 4.8,
    distance: '1.2 km',
    cuisine: 'Salads, Bowls',
    nutrition: { calories: '300-600', protein: '20-40g', carbs: '30-50g', fat: '10-20g' },
  },
  {
    id: 2,
    name: 'FitFuel Kitchen',
    imageId: 'restaurant4',
    rating: 4.9,
    distance: '2.5 km',
    cuisine: 'High-Protein, Keto',
    nutrition: { calories: '450-800', protein: '40-60g', carbs: '10-30g', fat: '20-40g' },
  },
  {
    id: 3,
    name: 'Earthly Eats',
    imageId: 'restaurant2',
    rating: 4.7,
    distance: '0.8 km',
    cuisine: 'Vegan, Organic',
    nutrition: { calories: '350-550', protein: '15-25g', carbs: '40-60g', fat: '15-25g' },
  },
  {
    id: 4,
    name: 'Pure Power',
    imageId: 'restaurant3',
    rating: 4.6,
    distance: '3.1 km',
    cuisine: 'Smoothies, Juices',
    nutrition: { calories: '150-400', protein: '5-25g', carbs: '20-50g', fat: '5-15g' },
  },
];

export const meals: Meal[] = [
  { id: 1, name: 'Grilled Chicken Salad', imageId: 'meal1', description: 'Lean chicken breast over fresh greens.', calories: 450, protein: 40, carbs: 15, fat: 25, type: 'Lunch' },
  { id: 2, name: 'Salmon & Asparagus', imageId: 'meal2', description: 'Omega-3 rich salmon with roasted greens.', calories: 550, protein: 35, carbs: 20, fat: 35, type: 'Dinner' },
  { id: 3, name: 'Vegan Tofu Scramble', imageId: 'meal3', description: 'A savory and protein-packed vegan breakfast.', calories: 350, protein: 25, carbs: 25, fat: 18, type: 'Breakfast' },
  { id: 4, name: 'Protein Smoothie Bowl', imageId: 'meal4', description: 'A refreshing bowl with fruit and whey.', calories: 400, protein: 30, carbs: 45, fat: 12, type: 'Snacks' },
  { id: 5, name: 'Overnight Oats', imageId: 'meal5', description: 'Heart-healthy oats with chia and berries.', calories: 320, protein: 15, carbs: 50, fat: 8, type: 'Breakfast' },
  { id: 6, name: 'Hearty Lentil Soup', imageId: 'meal6', description: 'Fiber-rich and warming lentil soup.', calories: 380, protein: 20, carbs: 60, fat: 5, type: 'Lunch' },
];

export const userProfileData: UserProfile = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  age: 28,
  gender: 'Male',
  dietaryPreferences: 'High-Protein',
  allergies: 'None',
  healthGoals: 'Muscle Gain',
};
