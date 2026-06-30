import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserProfile, UserProfileToken } from "@/types/user";
const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export const api = axios.create({  baseURL: `${API}/api/` });

interface AuthContextType {
  userProfile: UserProfile | null;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  signUp: (
    username: string,
    email: string,
    password: string,
    name: string,
  ) => Promise<{ success: boolean; message: string }>;
  updateUser: (updated: UserProfile) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) setUserProfile(JSON.parse(stored));
  }, []);

  const login = async (
    email: string,
    password: string,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await api.post(`auth/signin`, {
        email,
        password,
      });
      console.log("Login response:", res.data);
      setUserProfile(res.data.userProfile);
      localStorage.setItem("currentUser", JSON.stringify(res.data.user));

      return { success: true, message: res.data.message };
    } catch (err: any) {
      const message =
        err.response?.data?.message ?? "Could not connect to server.";
      return { success: false, message };
    }
  };

  const signUp = async (
    email: string,
    username: string,
    password: string,
    name: string,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await api.post(`auth/signup`, {
        email,
        password,
        name,
        username,
      });

      return { success: true, message: res.data.message };
    } catch (err: any) {
      const message =
        err.response?.data?.message ?? "Could not connect to server.";
      return { success: false, message };
    }
  };

  const logout = () => {
    setUserProfile(null);
    localStorage.removeItem("currentUser");
  };

  const updateUser = (updated: UserProfile) => {
    setUserProfile(updated);
    localStorage.setItem("currentUser", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ userProfile, login, logout, signUp, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
