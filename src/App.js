import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import UserPage from './components/UserPage';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/:name" element={<UserPage />} />
    </Routes>
  );
}

export default App;
