import type { GoogleCredentialResponse } from "@react-oauth/google";
import type { ReactNode } from "react";

interface WSMessage {
  event: string;
  data: unknown;
};

interface WebSocketContextType {
  onMessage: (callback: (msg: WSMessage) => void) => void;
  sendMessage: (msg: unknown) => void;
  removeHandler: (callback: (msg: WSMessage) => void) => void;
};

interface WebSocketProviderProps {
  url?: string;
  children: ReactNode;
};

interface SocketTestData {
  message: string;
}

interface SocketParkingStatus {
  slot: number;
  status: boolean;
}

interface User {
  id?: string;
  name: string;
  email: string;
  googleId?: string;
  role?: string;
}

interface AuthContextType {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  handleGoogleLogin: ( ) => Promise<boolean>;
  isLoading: boolean;
  isGoogleLoading: boolean;
  currentUser: User | null;
  isAuthenticated: boolean;
  errorMessage: string;
}


interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode
};

export type { 
  WSMessage, 
  WebSocketContextType, 
  WebSocketProviderProps, 
  SocketTestData, 
  SocketParkingStatus,
  AuthContextType,
  User,
  ThemeContextType,
  ThemeProviderProps
};