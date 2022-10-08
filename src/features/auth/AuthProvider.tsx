import { createContext, ReactNode, useContext, useReducer } from 'react';
import { IUser } from './types';

interface AuthContextValueType {
  user: IUser | null | undefined;
  signUp: (signUpCreds: ISignUpCreds) => void;
  login: () => void;
  logout: () => void;
}

const initialAuthContextValue: AuthContextValueType = {
  user: null,
  signUp: () => {},
  login: () => {},
  logout: () => {},
};

interface AuthAction {
  type: 'LOGIN' | 'LOGOUT';
  payload: IUser | null | undefined;
}

const AuthContext = createContext<AuthContextValueType>(
  initialAuthContextValue
);

type IState = IUser | null | undefined;

export interface ISignUpCreds {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const userReducer = (state: IState, action: AuthAction) => {
  switch (action.type) {
    case 'LOGIN': {
      return action.payload;
    }
    case 'LOGOUT': {
      return null;
    }
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, dispatch] = useReducer(userReducer, null);

  const login = () => {
    // TODO
  };

  const logout = () => {
    // TODO
  };

  const signUp = async (signUpCreds: ISignUpCreds) => {
    const res = await fetch('/api/sign-up', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signUpCreds),
    });
  };

  const value = {
    user,
    login,
    logout,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
