import { Box, Container, Heading, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface FormProps {
  onSubmit: () => void;
  children?: ReactNode;
  title?: string;
}

const Form = ({ onSubmit, children, title }: FormProps) => {
  return (
    <Container>
      <Box
        onSubmit={onSubmit}
        as="form"
        p={4}
        bgColor="white"
        rounded="md"
        boxShadow="md"
        mt={2}
      >
        {Boolean(title) && <Heading as="h2">{title}</Heading>}
        <VStack maxW="50rem" gap={2} alignItems="end" mt={6}>
          {children}
        </VStack>
      </Box>
    </Container>
  );
};

export default Form;
