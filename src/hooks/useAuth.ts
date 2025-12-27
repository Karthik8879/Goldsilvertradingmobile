'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedAuth = localStorage.getItem('goldjar-auth');
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      setIsLoggedIn(authData.isLoggedIn);
      setUser(authData.user);
    }
  }, []);

  const login = (email: string, password: string) => {
    // Mock login - in production, this would call your API
    const user = {
      name: 'Rajesh Kumar',
      email: email,
    };
    
    setIsLoggedIn(true);
    setUser(user);
    localStorage.setItem('goldjar-auth', JSON.stringify({ isLoggedIn: true, user }));
    router.push('/terminal');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('goldjar-auth');
    router.push('/');
  };

  return { isLoggedIn, user, login, logout };
}
