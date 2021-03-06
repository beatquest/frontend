import React from 'react';
import axios from 'axios';

import cm from '../images/cm.svg';
import qm from '../images/qm.svg';
import bm from '../images/bm.svg';
import sm from '../images/sm.svg';
import lm from '../images/lm.svg';
import { Link } from 'react-router-dom';

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const data = await axios.get('https://api.beatquest.com/leaderboard');
    this.setState({ data: data.data.data });
  }

  render() {
    if (this.state.data) {
      const players = this.state.data.map((player, i) => {
        var delta = <div className="delta text-secondary small">⬤ 0</div>;
        if (player.delta > 0) {
          delta = (
            <div className="delta text-success small">▲ {player.delta}</div>
          );
        } else if (player.delta < 0) {
          delta = (
            <div className="delta text-danger small">▼ {player.delta}</div>
          );
        }
        var color = {
          CM: '#e47d22',
          QM: '#cfd2d3',
          BM: '#f0f328',
          SM: '#a0ddd1',
          LM: '#51ebfd',
        }[player.rank];
        var icon = {
          CM: cm,
          QM: qm,
          BM: bm,
          SM: sm,
          LM: lm,
        }[player.rank];
        return (
          <tr key={player.id}>
            <td>{i + 1}</td>
            <td>
              {player.elo}
              {player.matches < 5 && <> (??)</>}
              {delta}
            </td>
            <td>
              <img src={player.image} alt={player.name} className="profile" />
              {<Link to={`/user/${player.id}`}>{player.name}</Link>}
              {player.rank !== 'N' && (
                <>
                  <br />
                  <span
                    className="badge badge-secondary"
                    style={{ backgroundColor: color }}
                  >
                    <span class="icon">
                      <img alt={player.rank} src={icon} />
                    </span>{' '}
                    {player.rank}
                  </span>
                </>
              )}
            </td>
            <td>
              {player.matches} Matches
              <br />
              <span className="text-muted">
                {player.wins + player.losses} Maps
              </span>
            </td>
            <td>
              {player.wins}/{player.losses}
              <br />
              <span className="text-muted">{player.norms} Norms</span>
            </td>
          </tr>
        );
      });
      return (
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Rating</th>
              <th scope="col">Player</th>
              <th scope="col">Matches</th>
              <th scope="col">W/L</th>
            </tr>
          </thead>
          <tbody>{players}</tbody>
        </table>
      );
    } else return <></>;
  }
}

export default Leaderboard;
