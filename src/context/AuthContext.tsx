'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, DeliveryAddress } from '@/lib/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  loginAsAdmin: () => void;
  register: (
    fullName: string,
    email: string,
    phone: string,
    password?: string
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  saveAddress: (address: DeliveryAddress) => void;
  deleteAddress: (index: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_USER_STORAGE = 'komban_auth_user_v1';

const DEFAULT_DEMO_USER: UserProfile = {
  id: 'usr-komban-001',
  fullName: 'Arun Kumar',
  phone: '+91 98422 55667',
  email: 'arunkumar@komban.demo',
  role: 'customer',
  savedAddresses: [
    {
      fullName: 'Arun Kumar',
      phone: '+91 98422 55667',
      houseNo: '24/1, Lakshmi Illam',
      street: 'Cross Cut Road 7th Cross',
      area: 'Gandhipuram & Ram Nagar',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      pincode: '641012',
      deliveryInstructions: 'Doorbell on the right gate.',
    },
  ],
  createdAt: new Date().toISOString(),
};

const DEFAULT_ADMIN_USER: UserProfile = {
  id: 'usr-komban-admin',
  fullName: 'Komban Store Admin',
  phone: '+91 98422 12345',
  email: 'admin@kombancuts.com',
  role: 'admin',
  savedAddresses: [],
  createdAt: new Date().toISOString(),
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_USER_STORAGE);
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Default to demo customer for immediate convenience
        setUser(DEFAULT_DEMO_USER);
        localStorage.setItem(AUTH_USER_STORAGE, JSON.stringify(DEFAULT_DEMO_USER));
      }
    } catch (e) {
      console.error('Error loading auth user:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveUserToStorage = (updatedUser: UserProfile | null) => {
    setUser(updatedUser);
    if (updatedUser) {
      localStorage.setItem(AUTH_USER_STORAGE, JSON.stringify(updatedUser));
    } else {
      localStorage.removeItem(AUTH_USER_STORAGE);
    }
  };

  const login = async (email: string, _password?: string) => {
    setLoading(true);
    // If Supabase is configured, attempt real auth
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: _password || 'password123',
        });
        if (error) {
          setLoading(false);
          return { success: false, message: error.message };
        }
        if (data.user) {
          const newUser: UserProfile = {
            id: data.user.id,
            fullName: data.user.user_metadata?.full_name || email.split('@')[0],
            phone: data.user.phone || '+91 98422 55667',
            email: data.user.email || email,
            role: email.includes('admin') ? 'admin' : 'customer',
            savedAddresses: [],
            createdAt: data.user.created_at,
          };
          saveUserToStorage(newUser);
          setLoading(false);
          return { success: true };
        }
      } catch (err: any) {
        console.warn('Supabase signIn failed, falling back to local auth:', err.message);
      }
    }

    // Local / Offline fallback auth
    const isAdmin = email.toLowerCase().includes('admin') || email === 'admin@kombancuts.com';
    const profile: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: isAdmin ? 'Komban Cuts Admin' : email.split('@')[0],
      phone: '+91 98422 12345',
      email,
      role: isAdmin ? 'admin' : 'customer',
      savedAddresses: isAdmin ? [] : DEFAULT_DEMO_USER.savedAddresses,
      createdAt: new Date().toISOString(),
    };

    saveUserToStorage(profile);
    setLoading(false);
    return { success: true };
  };

  const loginAsAdmin = () => {
    saveUserToStorage(DEFAULT_ADMIN_USER);
  };

  const register = async (
    fullName: string,
    email: string,
    phone: string,
    _password?: string
  ) => {
    setLoading(true);
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: _password || 'password123',
          options: {
            data: { full_name: fullName, phone },
          },
        });
        if (error) {
          setLoading(false);
          return { success: false, message: error.message };
        }
        if (data.user) {
          const profile: UserProfile = {
            id: data.user.id,
            fullName,
            phone,
            email,
            role: 'customer',
            savedAddresses: [],
            createdAt: new Date().toISOString(),
          };
          saveUserToStorage(profile);
          setLoading(false);
          return { success: true };
        }
      } catch (err: any) {
        console.warn('Supabase signUp fallback:', err.message);
      }
    }

    const profile: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName,
      phone,
      email,
      role: 'customer',
      savedAddresses: [],
      createdAt: new Date().toISOString(),
    };

    saveUserToStorage(profile);
    setLoading(false);
    return { success: true };
  };

  const logout = async () => {
    if (isSupabaseConfigured() && supabase) {
      await supabase.auth.signOut().catch(() => {});
    }
    saveUserToStorage(null);
  };

  const saveAddress = (newAddress: DeliveryAddress) => {
    if (!user) return;
    const currentAddresses = user.savedAddresses || [];
    const updated = [newAddress, ...currentAddresses];
    const updatedUser = { ...user, savedAddresses: updated };
    saveUserToStorage(updatedUser);
  };

  const deleteAddress = (index: number) => {
    if (!user) return;
    const currentAddresses = [...(user.savedAddresses || [])];
    currentAddresses.splice(index, 1);
    const updatedUser = { ...user, savedAddresses: currentAddresses };
    saveUserToStorage(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLoggedIn: !!user,
        isAdmin: user?.role === 'admin',
        login,
        loginAsAdmin,
        register,
        logout,
        saveAddress,
        deleteAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
