import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../auth/AuthProvider';

const deletePost = async (postId: string) => {
  const token = localStorage.getItem('auth-token');

  if (!token) {
    throw new Error('Please login to delete the post.');
  }

  const res = await fetch(`/api/posts/${postId}/delete`, {
    method: 'post',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (res.status >= 500) {
    throw new Error('Server Error');
  }
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message as string);
  }
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });
};
