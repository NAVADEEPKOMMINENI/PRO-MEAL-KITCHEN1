'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { handleMealRecommendation } from '@/app/actions';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const initialState = {
  message: '',
  recommendations: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} disabled={pending} className="w-full sm:w-auto">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Get Recommendations
    </Button>
  );
}

export default function RecommendationForm() {
  const [state, formAction] = useActionState(handleMealRecommendation, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dietaryPreferences">Dietary Preferences</Label>
          <Input id="dietaryPreferences" name="dietaryPreferences" placeholder="e.g., Vegan, Keto" defaultValue="High-protein" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="healthGoals">Health Goals</Label>
          <Input id="healthGoals" name="healthGoals" placeholder="e.g., Weight loss" defaultValue="Muscle gain" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="pastOrderHistory">Past Orders (Optional)</Label>
        <Textarea
          id="pastOrderHistory"
          name="pastOrderHistory"
          placeholder="e.g., Chicken salads, protein shakes"
          defaultValue="Grilled chicken, salmon dishes"
        />
      </div>
      <div className="flex justify-end">
        <SubmitButton />
      </div>
      
      {state.recommendations && (
        <div className="pt-4">
          <h3 className="font-semibold mb-2">Here are your personalized recommendations:</h3>
          <Card className="bg-primary/5">
            <CardContent className="p-4">
              <p className="text-sm text-foreground/90 whitespace-pre-wrap">{state.recommendations}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {state.message && state.message !== 'success' && (
        <p className="text-sm text-destructive pt-2">{state.message}</p>
      )}
    </form>
  );
}
