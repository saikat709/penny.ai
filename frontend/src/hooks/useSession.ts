import { createContext, useContext } from 'react';

type SessionContextValue = {
    hasSession: boolean;
    setHasSession?: (v: boolean) => void;
    updateSession?: () => void;
};

const SessionContext = createContext<SessionContextValue>({
    hasSession: false,
    setHasSession: () => {},
    updateSession: () => {}
});

const useSession = () => {
    return useContext(SessionContext);
}

export { SessionContext, type SessionContextValue };
export default useSession;