import { useMutation } from '@tanstack/react-query';
import { ISignUpCreds } from '../types';

const signUp = async (signUpCreds: ISignUpCreds) => {
  const res = await fetch('/api/sign-up', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signUpCreds),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message as string);
  }
};

export const useSignUp = () => {
  return useMutation(signUp);
};
