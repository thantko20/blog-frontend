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
import { useNavigate } from 'react-router-dom';
import { useSignUp } from './api/useSignUp';
import { ISignUpCreds } from './types';
import Form from '../../components/Form';

const schema = yup.object({
  email: yup.string().email('Must be a valid email').required(),
  firstName: yup
    .string()
    .min(2, 'Must be at least 2 characters long')
    .required(),
  lastName: yup
    .string()
    .min(2, 'Must be at least 2 characters long')
    .required(),
  password: yup
    .string()
    .min(8, 'Must be at least 8 characters long.')
    .required(),
});

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpCreds>({
    resolver: yupResolver(schema),
  });

  const mutation = useSignUp();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = (data: ISignUpCreds) => {
    mutation.mutate(data, {
      onSuccess: () => {
        navigate('/login');
      },
      onError: (error) => {
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
    <Form onSubmit={handleSubmit(onSubmit)} title="Sign Up">
      <FormControl isInvalid={!!errors?.email}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input {...register('email')} id="email" type="email" />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors?.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input {...register('password')} id="password" type="password" />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors?.firstName}>
        <FormLabel htmlFor="firstName">First Name</FormLabel>
        <Input {...register('firstName')} id="firstName" type="text" />
        <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors?.lastName}>
        <FormLabel htmlFor="lastName">Last Name</FormLabel>
        <Input {...register('lastName')} id="lastName" type="text" />
        <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
      </FormControl>
      <Button type="submit" isLoading={mutation.isLoading} colorScheme="blue">
        Sign Up
      </Button>
    </Form>
  );
};

export default SignUpForm;
