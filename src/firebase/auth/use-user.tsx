'use client';
import { useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, Auth, User } from 'firebase/auth';
import { FirebaseContext } from '@/firebase/provider';


export interface UserAuthHookResult {
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}

/**
 * Hook for accessing the authenticated user's state.
 * This provides the User object, loading status, and any auth errors.
 * @returns {UserAuthHookResult} Object with user, isUserLoading, userError.
 */
export const useUser = (): UserAuthHookResult => {
  const context = useContext(FirebaseContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a FirebaseProvider.');
  }

  // Directly return the user state from the context
  return {
    user: context.user,
    isUserLoading: context.isUserLoading,
    userError: context.userError,
  };
};
