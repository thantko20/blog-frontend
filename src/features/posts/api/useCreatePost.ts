import { useMutation } from '@tanstack/react-query';
import { IPost, IPostFormData } from '../types';

const createPost = async (postData: IPostFormData) => {
  const token = localStorage.getItem('auth-token');
  if (!token) {
    throw Error('Please Login To Post.');
  }

  const res = await fetch('/api/posts', {
    method: 'post',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(postData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message as string);
  }
  return data.postId as string;
};

export const useCreatePost = () => {
  return useMutation(createPost);
};
