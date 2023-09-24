import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { IEntity } from "./types";

const AuthContext = createContext<IEntity.AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IEntity.User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("access_token");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);


  function login(userCredentials: IEntity.User) {
    setUser(userCredentials);
    localStorage.setItem("access_token", JSON.stringify(userCredentials));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("access_token");
  }

  const value: IEntity.AuthContextType = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
