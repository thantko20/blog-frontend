import { useQuery } from '@tanstack/react-query';
import { IPost } from '../types';

const getPostById = async (id: string) => {
  const res = await fetch(`/api/posts/${id}`);
  const data = await res.json();

  return data.data as IPost;
};

export const usePost = (id: string) => {
  return useQuery(['posts', id], () => getPostById(id), {
    refetchOnWindowFocus: false,
  });
};
