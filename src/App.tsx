import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="bg-blue-500 text-red-300 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h1>Home Page</h1>;
}

export default App;
