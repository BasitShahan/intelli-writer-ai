"use client";

import { ReactNode, createContext, useContext, useState } from "react";

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextValue {
  tokens: string | null;
  setTokens: (tokens: string | null) => void;
  nameLetter: string;
  setNameLetter: (nameLetter: string) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [tokens, setTokens] = useState<string | null>(null);
  const [nameLetter, setNameLetter] = useState<string>("");

  const value: AuthContextValue = {
    tokens,
    setTokens,
    nameLetter,
    setNameLetter,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
