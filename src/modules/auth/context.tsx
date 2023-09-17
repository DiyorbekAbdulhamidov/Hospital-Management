import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type User = {

};

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
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

  useEffect(() => {
    const savedUser = localStorage.getItem("access_token");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  function login(userCredentials: User) {
    setUser(userCredentials);
    localStorage.setItem("access_token", JSON.stringify(userCredentials));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}