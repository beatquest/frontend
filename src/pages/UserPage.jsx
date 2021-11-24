import { useEffect, useState } from 'react';
import { LineChart, Line, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Rank from '../components/Rank';
import Delta from '../components/Delta';

const UserPage = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [matches, setMatches] = useState();
  console.log(user);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchUser();
  }, [location]);

  useEffect(() => {
    populateUI();
    // eslint-disable-next-line
  }, [user]);

  const fetchUser = async () => {
    if (location.pathname) {
      const uid = location.pathname.split('/')[2];
      const user = await axios.get(`https://api.beatquest.com/user/${uid}`);
      user.data.data.matches = user.data.data.matches.sort(function (a, b) {
        var dateA = new Date(a.time),
          dateB = new Date(b.time);
        return dateB - dateA;
      });
      setUser(user.data.data);
    }
  };

  const isWin = (delta) => {
    return delta > 0;
  };

  const populateUI = () => {
    if (!user) return;

    // Populate Elo Rating Graph
    let ratings = [];
    const matchesReverse = user.matches.slice().reverse();
    for (const match of matchesReverse) {
      const date = new Date(match.time);
      ratings.push({
        elo: parseInt(match.p1.elo.after),
        date: date.toLocaleDateString(),
      });
    }
    setRatings(ratings);

    // Populate Recent Matches Table
    const matchesUI = user.matches.map((match) => {
      const player = user.name === match.p1.name ? 'p1' : 'p2';
      let win;
      player === 'p1'
        ? (win = isWin(match.p1.elo.delta))
        : (win = isWin(match.p2.elo.delta));
      const resultUI =
        win === true ? (
          <div class="text-success">W</div>
        ) : (
          <div class="text-danger">L</div>
        );

      return (
        <tr>
          <td>
            <img src={match.event.image} alt={match.event.image} height={75} />
          </td>
          <td>
            <div>
              <Link
                style={{ textDecoration: 'none', color: 'white' }}
                to={`/user/${match.p1.id}`}
              >
                {match.p1.name}
              </Link>{' '}
              <Delta delta={match.p1.elo.delta} />
            </div>
            <Link
              style={{ textDecoration: 'none', color: 'white' }}
              to={`/user/${match.p2.id}`}
            >
              {match.p2.name}
            </Link>{' '}
            <Delta delta={match.p2.elo.delta} />
          </td>
          <td class="text-center">
            <div>{match.p1.score}</div>
            {match.p2.score}
          </td>
          <td class="text-center align-middle">{resultUI}</td>
          <td class=" align-middle">
            {new Date(match.time).toLocaleDateString()}
          </td>
        </tr>
      );
    });
    setMatches(matchesUI);
  };

  const renderDurationTooltip = (data) => {
    const { payload } = data;
    if (payload.length) {
      return (
        <div
          style={{
            textAlign: 'center',
            backgroundColor: 'black',
            padding: '2px 10px',
            borderRadius: '10px',
            opacity: 0.9,
            fontSize: 20,
          }}
        >
          Elo: {payload[0].payload.elo}
          <div>Date: {payload[0].payload.date}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {user ? (
        <div
          className="card bg-dark text-white m-5 mx-auto"
          style={{ width: 1000 }}
        >
          <div className="card-body mx-5 mt-5 mx-auto" style={{ width: 700 }}>
            <div class="row justify-content-around h-100">
              <div class="col-4">
                <img
                  src={user.image}
                  alt={user.name}
                  className="profile h-100 w-100"
                />
              </div>
              <div class="col-7 w-50 mt-3">
                {user.name} <Rank rank={user.rank} />
                <div style={{ fontSize: 22 }}>
                  <div class="d-flex justify-content-between">
                    <div>Elo</div>
                    <div style={{ fontWeight: 700 }}>{user.elo}</div>
                  </div>
                  <div class="d-flex justify-content-between text-success">
                    <div>Wins</div>
                    <div style={{ fontWeight: 700 }}>{user.wins}</div>
                  </div>
                  <div class="d-flex justify-content-between text-danger">
                    <div>Losses</div>
                    <div style={{ fontWeight: 700 }}>{user.losses}</div>
                  </div>
                  <div class="d-flex justify-content-between">
                    <div>Matches</div>
                    <div style={{ fontWeight: 700 }}>{user.matches.length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 class="mx-auto mt-5"> Elo Rating</h2>
          <LineChart
            className="mx-auto m-4"
            width={800}
            height={300}
            data={ratings}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" verticalPoints={[1000]} />
            <YAxis
              interval={0}
              domain={[500, 3000]}
              ticks={[500, 1000, 1500, 2000, 2500, 3000]}
              style={{
                fontSize: '1.5rem',
              }}
            />
            <Tooltip content={renderDurationTooltip} />
            <Line type="monotone" dataKey="elo" stroke="#8884d8" dot={false} />
          </LineChart>

          <h2 class="mx-auto mt-5"> Recent Matches</h2>
          <table
            class="table table-dark m-5 mx-auto"
            style={{ width: 775, fontSize: 25 }}
          >
            <thead>
              <tr>
                <th scope="col">Event</th>
                <th scope="col">Players</th>
                <th scope="col">Score</th>
                <th scope="col">Result</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>{matches}</tbody>
          </table>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserPage;
