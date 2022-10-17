import { useQuery } from '@tanstack/react-query';
import { IComment } from '../types';

const getComments = async (postId: string) => {
  const res = await fetch(`/api/comments?postId=${postId}`);
  const data = await res.json();

  return data.data as IComment[];
};

export const useComments = (postId: string) => {
  return useQuery(['comments', { postId }], () => getComments(postId));
};
