import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './Login';
import Signup from './Signup';
import PrivateRoute from './PrivateRoute';

const Home = () => {
  return <h2>Home Page</h2>;
};

const Dashboard = () => {
  return <h2>Dashboard Page</h2>;
};

console.log(PrivateRoute)
function App() {

  // const { login } = useAuth();

  // useEffect(() => {
  //   // Check if the user is already authenticated (e.g., from secure storage)
  //   const storedUser = localStorage.getItem('user');

  //   if (storedUser) {
  //     login(JSON.parse(storedUser));
  //   }
  // }, [login]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <PrivateRoute path="/dashboard" element={<Dashboard />} />
        <PrivateRoute path="/" element={<Home />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
