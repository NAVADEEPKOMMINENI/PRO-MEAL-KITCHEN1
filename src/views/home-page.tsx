'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, Flame, Wheat, Vegan, BrainCircuit } from 'lucide-react';
import { restaurants, meals } from '@/models/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import RestaurantCard from '@/components/restaurant-card';
import RecommendationForm from '@/components/recommendation-form';
import type { Restaurant } from '@/models/types';

type FilterType = 'all' | 'high-protein' | 'low-carb' | 'vegan';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'high-protein') return matchesSearch && restaurant.cuisine.toLowerCase().includes('high-protein');
    if (activeFilter === 'low-carb') return matchesSearch && restaurant.nutrition.carbs.startsWith('10');
    if (activeFilter === 'vegan') return matchesSearch && restaurant.cuisine.toLowerCase().includes('vegan');

    return false;
  });

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(current => current === filter ? 'all' : filter);
  };
  
  return (
    <div className="w-full space-y-12">
      {/* Hero Section */}
      <div className="relative -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 lg:-mx-8 lg:-mt-8 h-[400px] w-auto overflow-hidden rounded-b-2xl">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Healthy Can Be Tasty!</h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">
            Discover nutritious restaurants, customize your meals, and achieve your health goals with convenient food delivery.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search for healthy restaurants or dishes..." 
            className="pl-10 h-12 text-base" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Button variant={activeFilter === 'all' ? 'default' : 'outline'} className="flex-shrink-0" onClick={() => setActiveFilter('all')}>
            <Filter className="mr-2 h-4 w-4" />
            All Filters
          </Button>
          <Button variant={activeFilter === 'high-protein' ? 'default' : 'secondary'} className="flex-shrink-0" onClick={() => handleFilterClick('high-protein')}>
            <Flame className="mr-2 h-4 w-4 text-orange-500" />
            High Protein
          </Button>
          <Button variant={activeFilter === 'low-carb' ? 'default' : 'secondary'} className="flex-shrink-0" onClick={() => handleFilterClick('low-carb')}>
            <Wheat className="mr-2 h-4 w-4 text-yellow-600" />
            Low Carb
          </Button>
          <Button variant={activeFilter === 'vegan' ? 'default' : 'secondary'} className="flex-shrink-0" onClick={() => handleFilterClick('vegan')}>
            <Vegan className="mr-2 h-4 w-4 text-green-500" />
            Vegan
          </Button>
        </div>
      </div>

      {/* Restaurant Feed */}
      <section>
        <h2 className="text-3xl font-bold tracking-tight mb-6">Featured Restaurants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      {/* AI Recommendation Tool */}
      <section>
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <BrainCircuit className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl font-bold">AI Nutrition Assistant</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Get personalized meal recommendations based on your unique goals and preferences.
            </p>
            <RecommendationForm />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
