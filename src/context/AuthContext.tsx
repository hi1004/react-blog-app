import { app } from '@/firebase';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { ReactNode, createContext, useEffect, useState } from 'react';

const AuthContext = createContext({
  user: null as User | null,
});

interface AuthProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthProps) => {
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setCurrentUser(user) : setCurrentUser(user);
    });
  }, [auth]);
  return (
    <AuthContext.Provider value={{ user: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
