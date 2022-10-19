import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { IPostFormData } from '../types';

interface IPostEditData extends IPostFormData {
  postId: string;
  authorId: string;
}

const editPost = async ({
  title,
  content,
  authorId,
  postId,
}: IPostEditData) => {
  const token = localStorage.getItem('auth-token');
  if (!token) {
    throw new Error('Please login to perform this action.');
  }

  const res = await fetch(`/api/posts/${postId}/edit?authorId=${authorId}`, {
    method: 'post',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content }),
  });

  if (res.status >= 500) {
    throw new Error('Server Error.');
  }
  if (!res.ok) {
    throw new Error((await res.json()).message as string);
  }

  const data = await res.json();
  return data.postId as string;
};

export const useEditPost = () => {
  return useMutation(editPost, {
    onError: (error) => {
      const toast = useToast();

      if (error instanceof Error) {
        toast({
          title: error.message,
          position: 'top',
          status: 'error',
          duration: 6000,
          isClosable: true,
        });
      }
    },
  });
};
