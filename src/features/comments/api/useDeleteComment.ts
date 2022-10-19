import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IComment } from '../types';

const deleteComment = async ({
  commentId,
  postId,
}: {
  commentId: string;
  postId: string;
}) => {
  const token = localStorage.getItem('auth-token');
  if (!token) {
    throw new Error('Log in to delete comment.');
  }

  const res = await fetch(
    `/api/comments/${commentId}/delete?postId=${postId}`,
    {
      method: 'post',
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  if (res.status >= 500) {
    throw new Error('Server Error');
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message as string);
  }

  return data.data as IComment[];
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteComment, {
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        ['comments', { postId: variables.postId }],
        data,
      );
    },
  });
};
