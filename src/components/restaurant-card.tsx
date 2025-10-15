'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Star, Flame, Zap, Wheat, Droplet } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Restaurant as RestaurantType } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';

interface RestaurantCardProps {
  restaurant: RestaurantType;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const image = PlaceHolderImages.find((img) => img.id === restaurant.imageId);

  const handleAddToPlan = () => {
    toast({
      title: "Added to Plan!",
      description: `${restaurant.name} has been added to your meal plan.`,
    });
    // In a real app, you'd have a global state for the plan
    // For now, we'll just navigate to the plan page
    router.push('/plan');
  };

  const handleOrderNow = () => {
    router.push('/orders');
  };


  return (
    <Card className="flex flex-col overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg">
      <div className="relative h-48 w-full">
        {image && (
          <Image
            src={image.imageUrl}
            alt={restaurant.name}
            fill
            className="object-cover"
            data-ai-hint={image.imageHint}
          />
        )}
      </div>
      <CardHeader>
        <CardTitle>{restaurant.name}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <span>{restaurant.cuisine}</span>
          <span className="text-primary flex items-center gap-1">
            <Star className="w-4 h-4" /> {restaurant.rating}
          </span>
          <span>&#183;</span>
          <span>{restaurant.distance}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2 text-xs">
          <Badge variant="outline" className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-yellow-500" />
            {restaurant.nutrition.calories} Cal
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Flame className="w-3 h-3 text-orange-500" />
            {restaurant.nutrition.protein} Protein
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Wheat className="w-3 h-3 text-amber-600" />
            {restaurant.nutrition.carbs} Carbs
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Droplet className="w-3 h-3 text-sky-500" />
            {restaurant.nutrition.fat} Fat
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={handleAddToPlan}>Add to Plan</Button>
        <Button onClick={handleOrderNow}>Order Now</Button>
      </CardFooter>
    </Card>
  );
}
