import React, { createContext, useContext, useState, ReactNode } from "react";

type User = {
  // ... yuqoridagi ma'lumotlarni qo'shing
};

type UserDetails = {
  dateOfBirth: string;
  email: string;
  fullName: string;
  gender: string;
  id: string;
  permissions: string[];
  phoneNumber: string;
  roles: string[];
  userState: string;
};

type AuthContextType = {
  user: User | null;
  userDetails: UserDetails | null;
  login: (user: User) => void;
  logout: () => void;
  saveUserDetails: (details: UserDetails) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  function login(userCredentials: User) {
    setUser(userCredentials);
  }

  function logout() {
    setUser(null);
    setUserDetails(null);
  }

  function saveUserDetails(details: UserDetails) {
    setUserDetails(details);
  }

  const value: AuthContextType = {
    user,
    userDetails, // UserDetailsni ham o'z ichiga olish
    login,
    logout,
    saveUserDetails,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
