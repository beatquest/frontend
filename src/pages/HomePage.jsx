import React from 'react';

import logo from '../images/logo.svg';
import cm from '../images/cm.svg';
import qm from '../images/qm.svg';
import bm from '../images/bm.svg';
import sm from '../images/sm.svg';
import lm from '../images/lm.svg';

import Leaderboard from '../components/Leaderboard';
import EventsTable from './events/EventsTable';

function HomePage() {
  var color = {
    CM: '#e47d22',
    QM: '#cfd2d3',
    BM: '#f0f328',
    SM: '#a0ddd1',
    LM: '#51ebfd',
  };
  var icon = {
    CM: cm,
    QM: qm,
    BM: bm,
    SM: sm,
    LM: lm,
  };

  return (<>
    <div className="pt-1"></div>
    <div className="row mt-3 pt-5 pb-4 mb-3">
      <div className="col-3">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <div className="col-9 pt-4 mt-3">
        <p><b>Beat Saber Competitive Rankings</b></p>
        <p className="mb-0">
          <span
            className="badge badge-secondary"
            style={{ backgroundColor: color.CM }}
          >
            <span class="icon">
              <img alt="CM" src={icon.CM} />
            </span>
            CM
          </span>&nbsp;
          Candidate Master: Has played 5+ matches and 1500+ peak elo
        </p>
        <p className="mb-0">
          <span
            className="badge badge-secondary"
            style={{ backgroundColor: color.QM }}
          >
            <span class="icon">
              <img alt="CM" src={icon.QM} />
            </span>
            QM
          </span>&nbsp;
          Quest Master: Has played 5+ matches and 1800+ peak elo
        </p>
        <p className="mb-0">
          <span
            className="badge badge-secondary"
            style={{ backgroundColor: color.BM }}
          >
            <span class="icon">
              <img alt="CM" src={icon.BM} />
            </span>
            BM
          </span>&nbsp;
          Beat Master: Has played 5+ matches and 2000+ peak elo
        </p>
        <p className="mb-0">
          <span
            className="badge badge-secondary"
            style={{ backgroundColor: color.SM }}
          >
            <span class="icon">
              <img alt="CM" src={icon.SM} />
            </span>
            SM
          </span>&nbsp;
          Saber Master: Has 2200+ peak elo and 5+ norm matches
        </p>
        <p className="mb-0">
          <span
            className="badge badge-secondary"
            style={{ backgroundColor: color.LM }}
          >
            <span class="icon">
              <img alt="CM" src={icon.LM} />
            </span>
            LM
          </span>&nbsp;
          Legendary Master: Has achieved SM and 2500+ peak elo
        </p>
      </div>
    </div>
    <div className="row beatquest-home">
      <div className="col-7">
        <p className="mt-5"><b>Top Players</b></p>
        <Leaderboard />
      </div>
      <div className="col-5">
        <p className="mt-5"><b>Top Events</b></p>
        <EventsTable />
      </div>
    </div>
  </>);
}

export default HomePage;
