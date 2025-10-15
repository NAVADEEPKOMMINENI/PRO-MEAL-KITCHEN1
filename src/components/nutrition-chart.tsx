'use client';

import { TrendingUp } from 'lucide-react';
import { Pie, PieChart, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface NutritionChartProps {
  intake: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export default function NutritionChart({ intake }: NutritionChartProps) {
  const chartData = [
    { macro: 'Protein', value: intake.protein * 4, fill: 'hsl(var(--chart-2))' },
    { macro: 'Carbs', value: intake.carbs * 4, fill: 'hsl(var(--chart-3))' },
    { macro: 'Fat', value: intake.fat * 9, fill: 'hsl(var(--chart-5))' },
  ];

  const totalCalories = chartData.reduce((acc, item) => acc + item.value, 0);

  const chartConfig = {
    calories: {
      label: 'Calories',
    },
    protein: {
      label: 'Protein',
    },
    carbs: {
      label: 'Carbs',
    },
    fat: {
      label: 'Fat',
    },
  };

  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip
            cursor={false}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                const percentage = ((data.value / totalCalories) * 100).toFixed(0);
                return (
                  <div className="p-2 text-sm bg-background rounded-lg border shadow-sm">
                    <p className="font-bold">{`${data.macro}: ${data.value.toFixed(0)} kcal (${percentage}%)`}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="macro"
            innerRadius={60}
            strokeWidth={5}
          >
            {chartData.map((entry) => (
              <Cell key={`cell-${entry.macro}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
