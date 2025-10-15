'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { UserProfile } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore, useDoc, setDocumentNonBlocking, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  
  const userDocRef = useMemoFirebase(() => user ? doc(firestore, 'users', user.uid) : null, [firestore, user]);
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);

  const [profile, setProfile] = useState<Partial<UserProfile>>({});

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (userProfile) {
      setProfile(userProfile);
    }
  }, [userProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfile(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: keyof UserProfile) => (value: string) => {
    setProfile(prev => ({ ...prev, [id]: value }));
  };

  const handleSaveChanges = (section: string) => {
    if (!userDocRef) return;
    setDocumentNonBlocking(userDocRef, profile, { merge: true });
    toast({
      title: `${section} Updated`,
      description: "Your information has been saved successfully.",
    });
  };

  const avatarImage = PlaceHolderImages.find((img) => img.id === 'avatar');
  
  if (isUserLoading || isProfileLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <Skeleton className="h-32 w-32 rounded-full mb-4" />
                <Skeleton className="h-8 w-40 mb-2" />
                <Skeleton className="h-5 w-52" />
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <Skeleton className="h-7 w-64" />
                <Skeleton className="h-4 w-80" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-10 w-32" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <Image
                  src={user?.photoURL || avatarImage?.imageUrl || ''}
                  alt={profile.name || 'User'}
                  width={128}
                  height={128}
                  className="rounded-full object-cover"
                  data-ai-hint={avatarImage?.imageHint}
                />
              </div>
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-muted-foreground">{profile.email}</p>
              <Button variant="outline" className="mt-4" onClick={() => toast({ title: "Feature coming soon!", description: "You'll be able to change your profile picture in a future update."})}>Change Picture</Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={profile.name || ''} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={profile.email || ''} disabled />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" value={profile.age || ''} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={profile.gender || ''} onValueChange={handleSelectChange('gender')}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={() => handleSaveChanges('Personal Information')}>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dietary &amp; Health Goals</CardTitle>
              <CardDescription>Tailor your experience to your needs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dietaryPreferences">Dietary Preferences</Label>
                <Input id="dietaryPreferences" value={profile.dietaryPreferences || ''} onChange={handleInputChange}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Input id="allergies" value={profile.allergies || ''} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="healthGoals">Health Goals</Label>
                <Input id="healthGoals" value={profile.healthGoals || ''} onChange={handleInputChange} />
              </div>
              <Button onClick={() => handleSaveChanges('Dietary & Health Goals')}>Update Preferences</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
