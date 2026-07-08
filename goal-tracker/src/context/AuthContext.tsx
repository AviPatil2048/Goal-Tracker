import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserProfileToken } from "../types/user";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export const api = axios.create({  baseURL: `${API}/api/` });

interface AuthContextType {
  user: UserProfileToken | null;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  signUp: (
    email: string,
    password: string,
    name: string,
  ) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfileToken | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) setUser(JSON.parse(stored));
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
      setUser(res.data.user);
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
    password: string,
    name: string,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await api.post(`auth/signup`, {
        email,
        password,
        name,
      });

      return { success: true, message: res.data.message };
    } catch (err: any) {
      const message =
        err.response?.data?.message ?? "Could not connect to server.";
      return { success: false, message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };


  return (
    <AuthContext.Provider value={{ user, login, logout, signUp }}>
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
