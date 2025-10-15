'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PlusCircle, Flame, Wheat, Droplet, Zap } from 'lucide-react';
import { meals } from '@/lib/data';
import type { Meal } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type MealPlan = {
  Breakfast: Meal[];
  Lunch: Meal[];
  Snacks: Meal[];
  Dinner: Meal[];
};

const dailyGoals = {
  calories: 2200,
  protein: 150,
  carbs: 200,
  fat: 70,
};

export default function PlanPage() {
  const [mealPlan, setMealPlan] = useState<MealPlan>({
    Breakfast: [],
    Lunch: [],
    Snacks: [],
    Dinner: [],
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const totals = Object.values(mealPlan).flat().reduce(
    (acc, meal) => {
      acc.calories += meal.calories;
      acc.protein += meal.protein;
      acc.carbs += meal.carbs;
      acc.fat += meal.fat;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const addMealToPlan = (meal: Meal, category: keyof MealPlan) => {
    setMealPlan((prev) => ({
      ...prev,
      [category]: [...prev[category], meal],
    }));
  };
  
  const addRandomMeal = (category: keyof MealPlan) => {
    const availableMeals = meals.filter(m => m.type === category);
    if(availableMeals.length > 0) {
      const randomMeal = availableMeals[Math.floor(Math.random() * availableMeals.length)];
      addMealToPlan(randomMeal, category);
    }
  }

  const MealCard = ({ meal }: { meal: Meal }) => {
    const image = PlaceHolderImages.find((img) => img.id === meal.imageId);
    return (
      <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted">
        {image && (
          <Image
            src={image.imageUrl}
            alt={meal.name}
            width={64}
            height={64}
            className="rounded-md object-cover"
            data-ai-hint={image.imageHint}
          />
        )}
        <div className="flex-grow">
          <p className="font-semibold">{meal.name}</p>
          <p className="text-sm text-muted-foreground">{meal.calories} kcal</p>
        </div>
      </div>
    );
  };

  const MealCategorySection = ({ category }: { category: keyof MealPlan }) => (
    <Card>
      <CardHeader>
        <CardTitle>{category}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mealPlan[category].length > 0 ? (
          mealPlan[category].map((meal, index) => <MealCard key={`${meal.id}-${index}`} meal={meal} />)
        ) : (
          <p className="text-sm text-muted-foreground">No meals added yet.</p>
        )}
        <Button variant="outline" className="w-full" onClick={() => addRandomMeal(category)} disabled={!isClient}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Meal
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <h1 className="text-3xl font-bold tracking-tight">Build Your Meal Plan</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MealCategorySection category="Breakfast" />
          <MealCategorySection category="Lunch" />
          <MealCategorySection category="Snacks" />
          <MealCategorySection category="Dinner" />
        </div>
      </div>
      
      <div className="lg:col-span-1">
        <Card className="sticky top-8">
          <CardHeader>
            <CardTitle>Daily Summary</CardTitle>
            <CardDescription>Your nutritional intake for the day.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1 text-sm font-medium">
                <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-500" />Calories</span>
                <span>{totals.calories} / {dailyGoals.calories} kcal</span>
              </div>
              <Progress value={(totals.calories / dailyGoals.calories) * 100} />
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm font-medium">
                <span className="flex items-center gap-2"><Flame className="w-4 h-4 text-orange-500" />Protein</span>
                <span>{totals.protein} / {dailyGoals.protein} g</span>
              </div>
              <Progress value={(totals.protein / dailyGoals.protein) * 100} className="[&>*]:bg-orange-500" />
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm font-medium">
                <span className="flex items-center gap-2"><Wheat className="w-4 h-4 text-amber-600" />Carbs</span>
                <span>{totals.carbs} / {dailyGoals.carbs} g</span>
              </div>
              <Progress value={(totals.carbs / dailyGoals.carbs) * 100} className="[&>*]:bg-amber-600" />
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm font-medium">
                <span className="flex items-center gap-2"><Droplet className="w-4 h-4 text-sky-500" />Fat</span>
                <span>{totals.fat} / {dailyGoals.fat} g</span>
              </div>
              <Progress value={(totals.fat / dailyGoals.fat) * 100} className="[&>*]:bg-sky-500" />
            </div>
            <Button className="w-full">Save and Schedule Plan</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
