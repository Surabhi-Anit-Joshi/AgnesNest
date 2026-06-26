import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import FindPG from './pages/FindPG/FindPG';
import PGDetails from './pages/FindPG/PGDetails';
import Marketplace from './pages/Marketplace/Marketplace';
import ProductDetails from './pages/Marketplace/ProductDetails';
import LostFound from './pages/LostFound/LostFound';
import LostFoundDetails from './pages/LostFound/LostFoundDetails';
import Profile from './pages/Profile/Profile';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/find-pg" element={<FindPG />} />
        <Route path="/pg/:id" element={<PGDetails />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/lost-found" element={<LostFound />} />
        <Route path="/lost-found/:id" element={<LostFoundDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
