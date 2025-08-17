import {
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AuthContextType, User } from "../libs/HookTypes";
import { AuthContext } from "../hooks/useAuth";
import { useGoogleLogin, type CodeResponse } from "@react-oauth/google";


const apiUrl = import.meta.env.VITE_API_URL;

export const AuthContextProvider = ({
  children,
}: { children: ReactNode }) => {

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');


  useEffect(() => {
    const localUserInfo = localStorage.getItem("userInfo");
    if (localUserInfo) {
      const userData: User = JSON.parse(localUserInfo);
      setCurrentUser(userData);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);



  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed');
        return false;
      }
      const data = await response.json();
      const user: User = data.user;
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem("userInfo", JSON.stringify(user));
      return true;
    } catch (error) {
      setErrorMessage('An unexpected error occurred');
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async ( codeResponse: Omit<CodeResponse, "error"> ) => {
      console.log('Google login successful:', codeResponse);

      try {
        const response = await fetch(`${apiUrl}/auth/google`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code: codeResponse.code }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.message || 'Google login failed');
          return;
        }
        const data = await response.json();
        const user: User = data.user;
        setCurrentUser(user);
        setIsAuthenticated(true);
        localStorage.setItem("userInfo", JSON.stringify(user));
      } catch (error) {
        setErrorMessage('An unexpected error occurred during Google login');
        console.error('Google login error:', error);
      }
    },

    onError: (error ) => {
      console.error('Google login error:', error);
      setErrorMessage(`Error signing in with Google: ${error.message || 'Unknown error'}`);
    },

    flow: 'auth-code',
    scope: 'email profile'

  });

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      googleLogin();
      return true;
    } catch (error) {
      setErrorMessage('An unexpected error occurred');
      console.error('Google login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  

  const logout = async () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("userInfo");
    setErrorMessage('');
    return true;
  };


  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    currentUser,
    errorMessage,
    login,
    logout,
    handleGoogleLogin,
    isGoogleLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

