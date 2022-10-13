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
import { useCreatePost } from './api/useCreatePost';
import { IPostFormData } from './types';
import { useAuth } from '../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  title: yup.string().min(2).required(),
  content: yup.string().required(),
});

const CreatePostForm = () => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IPostFormData>({
    resolver: yupResolver(schema),
  });

  const { isLoggedIn } = useAuth();
  const mutation = useCreatePost();
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = (formData: IPostFormData) => {
    if (!isLoggedIn) {
      toast({
        title: 'Not logged in.',
        description: 'Please login to post.',
        status: 'error',
        duration: 5000,
        position: 'top',
      });
      return;
    }
    mutation.mutate(formData, {
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
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.title}>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input {...register('title')} id="title" type="text" />
        <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.content}>
        <FormLabel htmlFor="content">Content</FormLabel>
        <Controller
          name="content"
          control={control}
          render={({ field }) => <TextEditor onChange={field.onChange} />}
        />
        <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
      </FormControl>
      <Button type="submit" colorScheme="blue" variant="solid">
        Post
      </Button>
    </Form>
  );
};

export default CreatePostForm;
