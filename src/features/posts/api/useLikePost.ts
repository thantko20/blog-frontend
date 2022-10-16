import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IPost } from '../types';

const likePost = async (id: string) => {
  const token = localStorage.getItem('auth-token');
  if (!token) {
    throw Error('Please login to like the post.');
  }

  const res = await fetch(`/api/posts/${id}/like`, {
    method: 'post',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  if (!res.ok && res.status < 500) {
    throw new Error(data.message as string);
  }

  return data.data as IPost;
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation(likePost, {
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['posts', variables], data);
    },
  });
};
