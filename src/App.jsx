import React from 'react';
import { Route, Routes, Link, NavLink } from 'react-router-dom';
import { EventPage } from './pages/event/EventPage';
import { EventsPage } from './pages/events/EventsPage';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import LeaderboardPage from './pages/LeaderboardPage';
import logo from './images/icon.svg';

function App() {
  return (<>
    <nav className="navbar navbar-dark bg-dark fixed-top navbar-expand-sm">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="BQ" height="28" class="d-inline-block align-text-top" />
          &nbsp; BeatQuest
        </Link>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <NavLink to="/" className="nav-link">Home</NavLink>
            </li>
              <li class="nav-item">
                <NavLink to="/leaderboard" className="nav-link">Leaderboard</NavLink>
              </li>
            <li class="nav-item">
              <NavLink to="/events" className="nav-link">Events</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div className="container beatquest-main mt-5">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/user/:name" element={<UserPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/event/:id" element={<EventPage />} />
      </Routes>
    </div>
  </>);
}

export default App;
