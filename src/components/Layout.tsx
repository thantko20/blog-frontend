import {
  Button,
  HStack,
  Text,
  Link,
  Container,
  Box,
  Spinner,
} from '@chakra-ui/react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import useSignOut from '../features/auth/api/useSignOut';
import { useAuth } from '../features/auth/AuthProvider';

const Logo = () => {
  return (
    <Link
      as={RouterLink}
      to="/"
      fontSize="3xl"
      fontWeight="semibold"
      color="blue.500"
      lineHeight="none"
      _hover={{}}
    >
      Bloggy
    </Link>
  );
};

const Nav = () => {
  const { user } = useAuth();
  const signOut = useSignOut();

  return (
    <Container maxW="container.md">
      <HStack as="nav" justify="space-between" align="center" py="1rem">
        <Logo />
        <HStack spacing="1rem">
          {user && (
            <>
              <Text>
                {user.firstName} {user.lastName}
              </Text>
              <Button colorScheme="red" variant="outline" onClick={signOut}>
                Sign Out
              </Button>
            </>
          )}
          {!user && (
            <>
              <Button
                as={RouterLink}
                to="/sign-up"
                variant="outline"
                colorScheme="blue"
              >
                Sign Up
              </Button>
              <Button
                as={RouterLink}
                to="/login"
                variant="ghost"
                colorScheme="blue"
              >
                Login
              </Button>
            </>
          )}
        </HStack>
      </HStack>
    </Container>
  );
};

const Header = () => {
  return (
    <header>
      <Nav />
    </header>
  );
};

const Layout = () => {
  const { checkingStatus } = useAuth();
  return (
    <Box>
      {checkingStatus ? (
        <Box
          pos="fixed"
          inset="0"
          w="full"
          h="full"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner color="blue.400" size="xl" />
        </Box>
      ) : (
        <>
          <Header />
          <Container maxW="container.md" py={6}>
            <Outlet />
          </Container>
        </>
      )}
    </Box>
  );
};

export default Layout;
