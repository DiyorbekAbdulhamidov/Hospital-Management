import React, { useState, createContext, useContext } from "react";

const EmailContext = createContext<{
  email: string;
  setNewEmail: (email: string) => void;
} | undefined>(undefined);

const EmailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState("");

  const setNewEmail = (newEmail: string) => {
    setEmail(newEmail);
  };

  return (
    <EmailContext.Provider value={{ email, setNewEmail }}>
      {children}
    </EmailContext.Provider>
  );
};

const useEmail = () => {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error("useEmail must be used within an EmailProvider");
  }
  return context;
};

export { EmailProvider, useEmail };