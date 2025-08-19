import {
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AuthContextType, User } from "../libs/HookTypes";
import { AuthContext } from "../hooks/useAuth";
import { useGoogleLogin } from "@react-oauth/google";
import { jwt_decode } from "../utils/tokenUtils";
import axios from "axios";


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



  const login = async (
    email: string, password: string
  ): Promise<boolean> => {
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

      console.log("Google User:", user);
      
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
    flow: "implicit",
    scope: "openid profile email",

    onSuccess: async (tokenResponse: unknown) => {

      setIsGoogleLoading(true);
      try {
        const tr = tokenResponse as Record<string, unknown>;

        if (typeof tr.access_token === 'string') {
          const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${tr.access_token}` },
          });
          
          if (!res.ok) throw new Error("Failed to fetch Google userinfo");

          const profile = await res.json();
  
          console.log("google userinfo:", profile);
          
          const user: User = {
            name:     profile.name || '',
            email:    profile.email || '',
            googleId: profile.sub || '', 
            role: 'user' 
          };

          const springRes = await axios.post(`${apiUrl}/auth/google`, {
            googleId: user.googleId,
            name: user.name,
            email: user.email,
          });

          console.log("Spring response:", springRes);

          if ( !springRes.data.success ) {
            console.error("Error registering user in backend:", springRes.data.message);
            throw new Error("Failed to register user in backend");
          }
          
          setCurrentUser(user);
          setIsAuthenticated(true);
          setErrorMessage("Google login successful");
          localStorage.setItem("userInfo", JSON.stringify(user));

        } else if (typeof tr.credential === 'string') {
          
          const profile = jwt_decode(tr.credential) as Record<string, unknown>;
          
          console.log("decoded id_token:", profile);
          
          const userFromIdToken = {
            name: typeof profile.name === 'string' ? profile.name : (typeof profile.given_name === 'string' ? profile.given_name : ''),
            email: typeof profile.email === 'string' ? profile.email : '',
          } as import('../libs/HookTypes').User;
          
          setCurrentUser(userFromIdToken);
          setIsAuthenticated(true);
          
          localStorage.setItem("userInfo", JSON.stringify(userFromIdToken));

        } else {
          console.warn("No access_token or credential on token response");
          setErrorMessage("Google login failed: No access token or credential found");
        }
      } catch (err) {
        console.error("Error processing Google login:", err);
        setErrorMessage("Google login failed");
      } finally {
        setIsGoogleLoading(false);
      }
    },
    onError: (err) => {
      console.error("Google login error:", err);
      setErrorMessage("Google login failed.");
      setIsGoogleLoading(false);
    }
  });

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setIsGoogleLoading(true);
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

