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
  VStack,
} from '@chakra-ui/react';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useLogin } from './api/useLogin';
import { ILoginCreds } from './types';

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

  const onSubmit = (formData: ILoginCreds) => {
    mutation.mutate(formData, {
      onSuccess: (data) => {
        loggedIn(data);
        navigate('/');
      },
    });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        {mutation.isError && (
          <Text color="red">{(mutation.error as Error).message}</Text>
        )}
        <VStack maxW="50rem" gap={4} alignItems="start">
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input {...register('email')} id="email" type="email" />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input {...register('password')} id="password" type="password" />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            isLoading={mutation.isLoading}
            colorScheme="blue"
          >
            Login
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default LoginForm;
