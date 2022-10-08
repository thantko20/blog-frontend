import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { AuthProvider } from './features/auth/AuthProvider';
import Home from './pages/home';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/sign-up" element={<></>} />
            <Route path="/login" element={<></>} />
            <Route path="/post/:postId" element={<></>} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
