import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { IUser } from './types';

interface IAuthContextValue {
  user: IUser | null | undefined;
  isLoggedIn: boolean;
  checkingStatus: boolean;
  loggedIn: (data: IUser) => void;
  loggedOut: () => void;
}

interface IAuthState {
  user: IUser | null | undefined;
  isLoggedIn: boolean;
  checkingStatus: boolean;
}

const initialAuthContextValue: IAuthContextValue = {
  user: null,
  isLoggedIn: false,
  checkingStatus: true,
  loggedIn: (data: IUser) => {},
  loggedOut: () => {},
};

interface AuthAction {
  type: 'CHECKING' | 'LOGGED_IN' | 'LOGGED_OUT';
  payload?: IUser | null | undefined;
}

const AuthContext = createContext<IAuthContextValue>(initialAuthContextValue);

const userReducer = (state: IAuthState, action: AuthAction) => {
  switch (action.type) {
    case 'CHECKING': {
      return {
        ...state,
        isLoggedIn: false,
        checkingStatus: true,
      };
    }
    case 'LOGGED_IN': {
      return {
        user: action.payload,
        isLoggedIn: true,
        checkingStatus: false,
      };
    }
    case 'LOGGED_OUT': {
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    }
    default:
      return state;
  }
};

const initialAuthState: IAuthState = {
  user: null,
  isLoggedIn: false,
  checkingStatus: true,
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [{ user, isLoggedIn, checkingStatus }, dispatch] = useReducer(
    userReducer,
    initialAuthState
  );

  useEffect(() => {
    // TODO: check auth in every page refresh
  }, []);

  const loggedIn = (data: IUser) => {
    dispatch({ type: 'LOGGED_IN', payload: data });
  };

  const loggedOut = () => {
    dispatch({ type: 'LOGGED_OUT' });
  };

  const value = {
    user,
    loggedIn,
    loggedOut,
    isLoggedIn,
    checkingStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
