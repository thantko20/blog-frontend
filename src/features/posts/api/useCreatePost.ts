import { useMutation } from '@tanstack/react-query';
import { IPostFormData } from '../types';

const createPost = async (data: IPostFormData) => {
  const res = await fetch(`/api/posts`, {
    method: 'post',
    headers: {
      authorization: `Bearer ${localStorage.getItem('auth-token')}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message as string);
  }
};

export const useCreatePost = () => {
  return useMutation(createPost);
};
