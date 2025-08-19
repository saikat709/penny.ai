import {
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AuthContextType, User } from "../custom_types/HookTypes";
import { AuthContext } from "../hooks/useAuth";
import { useGoogleLogin } from "@react-oauth/google";
import { jwt_decode, saveTokens } from "../utils/tokenUtils";
import axios from "axios";


const apiUrl = import.meta.env.VITE_API_URL;

export const AuthContextProvider = ({
  children,
}: { children: ReactNode }) => {

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');


  useEffect(() => {
    const checkLocalStorage = async () => {

      setIsLoading(true);
      const localUserInfo = localStorage.getItem("userInfo");
      
      if (localUserInfo) {
        const userData = JSON.parse(localUserInfo);
        const user: User = {
          id: userData.id || 0,
          name: userData.name || " ",
          email: userData.email || " ",
          googleId: userData.googleId || " ",
          role: userData.role || 'user',
        }
        setCurrentUser(user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    }

    checkLocalStorage();
  }, []);


  const register = async (
    name: string, email: string, password: string
  ): Promise<boolean> => {

    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Registration failed');
        return false;
      }
      return true;

    } catch (error) {
      setErrorMessage('An unexpected error occurred');
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }

  }

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
      
      setCurrentUser(user);
      setIsAuthenticated(true);
      
      localStorage.setItem("userInfo", JSON.stringify(user));
      saveTokens(data.accessToken, data.refreshToken);
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
      let status = false;

      try {
        const tr = tokenResponse as Record<string, unknown>;
         const user: User = {
            name:  '',
            email:  '',
            googleId: '', 
            role: 'user' 
        };

        if ( typeof tr.access_token === 'string' ) {
          const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${tr.access_token}` },
          });
          
          if (!res.ok) throw new Error("Failed to fetch Google userinfo");

          const profile = await res.json();
          
          user.name = profile.name;
          user.email = profile.email;
          user.googleId = profile.sub;

        } else if (typeof tr.credential === 'string') {
          
          const profile = jwt_decode(tr.credential) as Record<string, unknown>;
          
          console.log("decoded id_token:", profile);
        
          const userFromIdToken = {
            name: typeof profile.name === 'string' ? profile.name : (typeof profile.given_name === 'string' ? profile.given_name : ''),
            email: typeof profile.email === 'string' ? profile.email : '',
          } as import('../custom_types/HookTypes').User;

          user.name = userFromIdToken.name;
          user.email = userFromIdToken.email;
          user.googleId = profile.sub as string;

        } else {
          console.warn("No access_token or credential on token response");
          throw new Error("No access token or credential found.");
        }

        console.log("google user:", user);
        const springRes = await axios.post(`${apiUrl}/auth/google`, {
            googleId: user.googleId,
            email: user.email,
            name: user.name
        });
        console.log("Spring response:", springRes);

        if ( !springRes.data.success ) {
          console.error("Error registering user in backend:", springRes.data.message);
          throw new Error("Failed to register user in backend");
        }

        setCurrentUser(user);
        setIsAuthenticated(true);
        localStorage.setItem("userInfo", JSON.stringify(user));
        saveTokens(springRes.data.accessToken, springRes.data.refreshToken);

        status = true;

      } catch (err) {
        console.error("Error processing Google login:", err);
        setErrorMessage("Google login failed");
        
        status = false;

      } finally {
        setIsGoogleLoading(false);
      }

      return status;
    },

    onError: () => {
      setErrorMessage("Google login failed.");
      setIsGoogleLoading(false);
    }
  });

  const handleGoogleLogin = async () => {
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
    register,
    handleGoogleLogin,
    isGoogleLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};