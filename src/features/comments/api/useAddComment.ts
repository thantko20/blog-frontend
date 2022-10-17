import { useAuth } from '../../auth/AuthProvider';
import { IComment } from '../types';

const addComment = async ({
  content,
  postId,
}: {
  content: string;
  postId: string;
}) => {
  const { user } = useAuth();
  const token = localStorage.getItem('auth-token');

  if (!token && !user) {
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
