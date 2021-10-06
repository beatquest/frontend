import React from 'react';
import logo from './logo.svg';
import axios from 'axios';

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const data = await axios.get('https://api.beatquest.com/leaderboard');
    this.setState({ data: data.data });
  }

  render() {
    if (this.state.data) {
      const players = this.state.data.map((player, i) => {
        var delta = <div className="delta text-secondary small">⬤ 0</div>;
        if (player.delta > 0) {
          delta = <div className="delta text-success small">▲ {player.delta}</div>;
        } else if (player.delta < 0) {
          delta = <div className="delta text-danger small">▼ {player.delta}</div>;
        }
        return <tr key={player.id}>
          <td>{i+1}</td>
          <td>
            {player.elo}{player.matches < 5 && <> (??)</>}
            {delta}
          </td>
          <td>{player.name}</td>
          <td>{player.wins}/{player.losses}</td>
        </tr>;
      });
      return <table className="table table-dark mt-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Rating</th>
            <th scope="col">Player</th>
            <th scope="col">W/L</th>
          </tr>
        </thead>
        <tbody>
          {players}
        </tbody>
      </table>;
    } else return <></>;
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="text-center">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Beat Saber Competitive Rankings</p>
        </div>
        <Leaderboard />
      </header>
    </div>
  );
}

export default App;
