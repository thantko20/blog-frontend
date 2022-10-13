import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useLogin } from './api/useLogin';
import { ILoginCreds } from './types';
import Form from '../../components/Form';

const schema = yup.object({
  email: yup.string().email('Must be a valid email').required(),
  password: yup
    .string()
    .min(8, 'Must be at least 8 characters long.')
    .required(),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginCreds>({
    resolver: yupResolver(schema),
  });

  const mutation = useLogin();
  const navigate = useNavigate();
  const { loggedIn } = useAuth();
  const toast = useToast();

  const onSubmit = (formData: ILoginCreds) => {
    mutation.mutate(formData, {
      onSuccess: (data) => {
        loggedIn(data);
        navigate('/');
      },
      onError: (error) => {
        if (error instanceof Error) {
          toast({
            title: error.message,
            position: 'top',
            status: 'error',
            duration: 8000,
            isClosable: true,
          });
        }
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} title="Login">
      <FormControl isInvalid={!!errors?.email}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input {...register('email')} id="email" type="email" />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors?.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input {...register('password')} id="password" type="password" />
        <FormErrorMessage as="p">{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <Button type="submit" isLoading={mutation.isLoading} colorScheme="blue">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
