import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { IComment } from '../types';

const likeComment = async ({
  commentId,
  postId,
}: {
  commentId: string;
  postId: string;
}) => {
  const token = localStorage.getItem('auth-token');
  if (!token) {
    throw new Error('Please login to like the comment.');
  }

  const res = await fetch(`/api/comments/${commentId}/like`, {
    method: 'post',
    headers: {
      authorization: `Bearer ${token}`,
    },
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

export const useLikeComment = () => {
  const queryClient = useQueryClient();
  return useMutation(likeComment, {
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        ['comments', { postId: variables.postId }],
        data,
      );
    },
  });
};
