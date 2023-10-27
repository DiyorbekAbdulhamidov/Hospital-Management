import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { IContext, IEntity } from "./types";
import { clearSession } from "../../utils";

const AuthContext = createContext<IContext.AuthContextType | undefined>(undefined);

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
  const [userInformation, setUserInformation] = useState<IEntity.User | null>(null);

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
    clearSession();
  }

  function setUserData(userData: IEntity.User) {
    setUserInformation(userData);
  }

  const value: IContext.AuthContextType = {
    user,
    login,
    logout,
    userData: userInformation,
    setUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}