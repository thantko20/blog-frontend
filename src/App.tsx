import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/sign-up" element={<></>} />
          <Route path="/login" element={<></>} />
          <Route path="/post/:postId" element={<></>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
