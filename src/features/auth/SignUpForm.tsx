import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ISignUpCreds, useAuth } from './AuthProvider';
import { Button } from '@chakra-ui/react';

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
  const { signUp } = useAuth();

  const onSubmit = async (data: ISignUpCreds) => {
    try {
      await signUp(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Button type="submit">Sign Up</Button>
    </form>
  );
};

export default SignUpForm;
