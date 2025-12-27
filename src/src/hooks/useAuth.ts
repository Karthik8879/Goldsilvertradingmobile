'use client';

import { useState, useEffect } from 'react';
import { authService } from '@/services/auth.service';
import { AuthResponse } from '@/types/auth.types';

export const useAuth = () => {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return {
    user,
    loading,
    isAuthenticated: authService.isAuthenticated(),
    logout,
  };
};
