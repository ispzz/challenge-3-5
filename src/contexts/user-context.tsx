"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface UserInfo {
  username: string;
  jobTitle: string;
}

interface UserContextType {
  user: UserInfo | null;
  isLoading: boolean;
  login: (userInfo: UserInfo) => void;
  updateUser: (userInfo: UserInfo) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = "user-info";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data
  useEffect(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setUser(parsedData);
      }
    } catch (error) {
      console.error("Failed to load user data:", error);
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userInfo: UserInfo) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userInfo));
    setUser(userInfo);
  };

  const updateUser = (userInfo: UserInfo) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userInfo));
    setUser(userInfo);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    // Force reload to ensure clean state
    window.location.href = "/login";
  };

  return <UserContext.Provider value={{ user, isLoading, login, updateUser, logout }}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
