import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { UserProfile, UserProfileToken } from "@/types/user";
import { registerApi, loginApi } from "@/services/AuthService";
import { toast } from "react-toastify";
const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export const api = axios.create({  baseURL: `${API}/api/` });

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password:string) => Promise<{ success: boolean; message: string }>;
  logOut: () => void;
  isLoggedIn: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const router = useRouter();
  const handleLogin = () => {
    router.push("/home");
  };

  const handleLogOut = () => {
    router.push("/");
  };


  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    const token = localStorage.getItem("token");
    if (stored && token) {
      setUser(JSON.parse(stored));
      setToken(token);
      //adds to every axios request
      axios.defaults.headers.common["Authorization"] = "Bearer " + token; 
    }
  setIsReady(true);

  }, []);

  //link function to api
  const registerUser = async (
    email:string, 
    username:string, 
    password: string) => {
    await registerApi(email, username, password).then((res) => {
      if (res){
        localStorage.setItem("token", res?.data.token);
        const userObj = {
          userName: res?.data.username,
          email: res?.data.email,
        }
        localStorage.setItem("currentUser", JSON.stringify(userObj));
        setToken(res?.data.token!);
        setUser(userObj!);
        toast.success("Login success");
        handleLogin();
      }
    }).catch((e) => toast.warning("Server error occured"));
  } 

  const loginUser = async (
    username: string,
    password: string,
  ): Promise<{ success: boolean; message: string }> => {
    try {
        const res = await loginApi(username, password);
        if (res){
          localStorage.setItem("token", res?.data.token);
          const userObj = {
            userName: res?.data.username,
            email: res?.data.email,
          }
          localStorage.setItem("currentUser", JSON.stringify(userObj));
          setToken(res?.data.token!);
          setUser(userObj!);
          toast.success("Login success");
          handleLogin();
        }
        else if (!res){
          return {success: false, message: "Could not reach server"}
        }
    }
    catch (err: any) {
      const message =
        err.response?.data?.message ?? "Could not connect to server.";
      return { success: false, message };
    }
    return { success: true, message: "connected"};

  };

  const isLoggedIn = () => {
    return !!user;
  };


  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setUser(null);
    setToken("");
    handleLogOut();
  }



  return (
    <AuthContext.Provider value={{ loginUser, user, token, logOut, isLoggedIn, registerUser }}>
      {/*async pattern to ensure components render properly*/}
      {isReady ? children : null}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context == undefined){
    throw new Error("useAuth must be used within the provider");
  }

  return context;
}