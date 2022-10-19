import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Form from '../../components/Form';
import TextEditor from '../../components/TextEditor';
import { useEditPost } from './api/useEditPost';
import { IPost, IPostFormData } from './types';
import { useNavigate, useLocation } from 'react-router-dom';

const schema = yup.object({
  title: yup.string().min(2).required(),
  content: yup.string().required(),
});

const EditPostForm = () => {
  const { state: post } = useLocation() as { state: IPost };
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IPostFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: post.title,
    },
  });
  const mutation = useEditPost();
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = (formData: IPostFormData) => {
    mutation.mutate(
      {
        ...formData,
        postId: post._id,
        authorId: post.author?._id as string,
      },
      {
        onSuccess(postId) {
          navigate(`/posts/${postId}`);
        },
        onError(error) {
          if (error instanceof Error) {
            toast({
              title: error.message,
              status: 'error',
              duration: 8000,
              isClosable: true,
              position: 'top',
            });
          }
        },
      },
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} title='Create Post'>
      <FormControl isInvalid={!!errors.title}>
        <FormLabel htmlFor='title'>Title</FormLabel>
        <Input {...register('title')} id='title' type='text' />
        <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.content}>
        <FormLabel htmlFor='content'>Content</FormLabel>
        <Controller
          name='content'
          control={control}
          render={({ field }) => (
            <TextEditor
              onChange={field.onChange}
              initialContent={post.content}
            />
          )}
        />
        <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
      </FormControl>
      <Button
        type='submit'
        colorScheme='blue'
        variant='solid'
        isLoading={mutation.isLoading}
      >
        Edit
      </Button>
    </Form>
  );
};

export default EditPostForm;
