import { useAuth } from '../AuthProvider';

const useSignOut = () => {
  const { loggedOut } = useAuth();

  const signOut = () => {
    localStorage.removeItem('auth-token');
    loggedOut();
  };

  return signOut;
};

export default useSignOut;
