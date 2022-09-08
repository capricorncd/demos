/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/06/07 23:02:43 (GMT+0900)
 */
import { Button } from 'antd';
import * as React from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { fakeAuthProvider } from './auth';

interface AuthContextType<T> {
  user: T;
  signIn: (user: string, callback: VoidFunction) => void;
  signOut: (callback: VoidFunction) => void;
}

const AuthContext = React.createContext<AuthContextType<string | null> | null>(
  null
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<string | null>(null);

  const signIn = (newUser: string, callback: VoidFunction) => {
    return fakeAuthProvider.signIn(() => {
      setUser(newUser);
      callback();
    });
  };

  const signOut = (callback: VoidFunction) => {
    return fakeAuthProvider.signOut(() => {
      setUser(null);
      callback();
    });
  };

  const value: AuthContextType<string | null> = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthStatus() {
  const auth = useAuth();
  const navigate = useNavigate();

  // console.log(auth);

  if (!auth?.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{' '}
      <Button
        onClick={() => {
          auth.signOut(() => navigate('/'));
        }}
      >
        Sign out
      </Button>
    </p>
  );
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
