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
  register: ( name: string, email: string, password: string ) => Promise<boolean>;
  login: ( email: string, password: string ) => Promise<boolean>;
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


export type TextData = {
  text: string;
}

export type MessagePart = {
  type: 'text' | 'bar_chart' | 'line_chart' | 'pie_chart';
  data: string;
}

export type Message = {
  id: string;
  type?: 'success' | 'failure' | 'error';
  parts: MessagePart[];
  sender: 'user' | 'ai';
}

export type ChatContextType = {
  messages: Message[];
  addMessage: ( message: Message ) => void;
};