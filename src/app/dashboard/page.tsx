import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Dumbbell, Target, Lightbulb } from 'lucide-react';
import NutritionChart from '@/components/nutrition-chart';

const dailyIntake = {
  calories: 1850,
  protein: 140,
  carbs: 160,
  fat: 70,
};

const dailyGoals = {
  calories: 2200,
  protein: 150,
  carbs: 200,
  fat: 70,
};

export default function DashboardPage() {
  const improvementSuggestion = () => {
    if (dailyIntake.protein < dailyGoals.protein - 10) {
      return "You're close to your protein goal! Consider adding a protein-rich snack like Greek yogurt to your afternoon.";
    }
    if (dailyIntake.calories < dailyGoals.calories - 300) {
      return "Your calorie intake is a bit low. A handful of nuts or an extra serving of healthy fats could help you meet your target.";
    }
    return "You're doing a great job balancing your macros today! Keep up the consistent effort.";
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Nutrition Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Calories</CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dailyIntake.calories} kcal</div>
            <p className="text-xs text-muted-foreground">Goal: {dailyGoals.calories} kcal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Average</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2105 kcal</div>
            <p className="text-xs text-muted-foreground">+2.1% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4/7 days</div>
            <p className="text-xs text-muted-foreground">Met calorie goal this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Protein Intake</CardTitle>
            <div className="h-4 w-4 text-orange-500">P</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dailyIntake.protein}g</div>
            <p className="text-xs text-muted-foreground">Goal: {dailyGoals.protein}g</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-5">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Macro Balance</CardTitle>
            <CardDescription>
              A breakdown of your calorie sources for today.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] w-full">
            <NutritionChart intake={dailyIntake} />
          </CardContent>
        </Card>
        <Card className="md:col-span-2 bg-accent/50 border-accent">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Lightbulb className="h-6 w-6 text-primary" />
              <CardTitle>Smart Suggestions</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground/80">
              {improvementSuggestion()}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
