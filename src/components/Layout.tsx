import { Outlet, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthProvider';

const Logo = () => {
  return <h1>Logo</h1>;
};

const Nav = () => {
  const { user, logout } = useAuth();
  return <h2>haha</h2>;
};

const Header = () => {
  return (
    <header>
      <Nav />
    </header>
  );
};

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
