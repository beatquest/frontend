import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { EventPage } from './pages/event/EventPage';
import { EventsPage } from './pages/events/EventsPage';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/user/:name" element={<UserPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/event/:id" element={<EventPage />} />
    </Routes>
  );
}

export default App;
