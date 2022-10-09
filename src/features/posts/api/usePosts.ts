import { useQuery } from '@tanstack/react-query';
import { IPost } from '../types';

const getPosts = async () => {
  const res = await fetch('/api/posts');

  const data = await res.json();

  return data.data as IPost[];
};

export const usePosts = () => {
  return useQuery(['posts'], getPosts);
};
