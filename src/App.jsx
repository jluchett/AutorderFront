// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import useStore from './store';
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => { 
  const user = useStore((state) => state.user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;