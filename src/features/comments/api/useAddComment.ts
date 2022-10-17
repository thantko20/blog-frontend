import { QueryClient, useMutation } from '@tanstack/react-query';
import { IComment } from '../types';

const addComment = async (content: string, postId: string) => {
  const token = localStorage.getItem('auth-token');

  if (!token) {
    throw new Error('Please login to comment on this post.');
  }

  const res = await fetch(`/api/comments?postId=${postId}`, {
    method: 'post',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  if (res.status >= 500) {
    throw new Error('Server Error.');
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message as string);
  }

  return data.data as IComment[];
};

export const useAddComment = (postId: string) => {
  const queryClient = new QueryClient();
  return useMutation((content: string) => addComment(content, postId), {
    onSuccess: (data) => {
      queryClient.setQueryData(['comments', { postId }], data);
    },
  });
};
