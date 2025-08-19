import { useEffect, useState, type PropsWithChildren } from "react";
import { SessionContext } from "../hooks/useSession";

const STORAGE_KEY = 'penny:hasSession';

interface SessionState {
  hasSession: boolean;
  lastPathName?: string;
  pageCount: number;
}

export const SessionProvider: React.FC<PropsWithChildren<object>> = ({ children }) => {
  const [session, setSession] = useState<SessionState>({
    hasSession: false,
    lastPathName: undefined,
    pageCount: 0
  });

  useEffect(() => {
    const sessionData = sessionStorage.getItem(STORAGE_KEY);
    if (sessionData) {
      setSession(JSON.parse(sessionData));
    }
  }, []);

  const updateSession = () => {
    const sessionData = sessionStorage.getItem(STORAGE_KEY);
    const prev: SessionState = sessionData
      ? JSON.parse(sessionData)
      : { hasSession: false, lastPathName: undefined, pageCount: 0 };

    const currentPath = window.location.pathname.split('#')[0];

    if (prev.lastPathName === currentPath) return;

    const newState: SessionState = {
      hasSession: prev.pageCount + 1 > 1,
      lastPathName: currentPath,
      pageCount: prev.pageCount + 1
    };

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    setSession(newState);
  };

  return (
    <SessionContext.Provider value={{
      hasSession: session.hasSession,
      updateSession
    }}>
      {children}
    </SessionContext.Provider>
  );
};
