import { useMutation } from '@tanstack/react-query';
import { ILoginCreds, IUser } from '../types';

const login = async (loginCreds: ILoginCreds) => {
  const res = await fetch('/api/sign-in', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginCreds),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message as string);
  }

  localStorage.setItem('auth-token', data.token);
  return data.user as IUser;
};

export const useLogin = () => {
  return useMutation((loginCreds: ILoginCreds) => {
    return login(loginCreds);
  });
};
