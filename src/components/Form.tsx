import { Container, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface FormProps {
  onSubmit: () => void;
  children?: ReactNode;
}

const Form = ({ onSubmit, children }: FormProps) => {
  return (
    <Container>
      <form onSubmit={onSubmit}>
        <VStack maxW="50rem" gap={4} alignItems="start">
          {children}
        </VStack>
      </form>
    </Container>
  );
};

export default Form;
