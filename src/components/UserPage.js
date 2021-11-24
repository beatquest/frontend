import { useEffect, useState } from 'react';
import { LineChart, Line, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Rank from './Rank';

const UserPage = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      if (location.pathname) {
        const uid = location.pathname.split('/')[2];
        const user = await axios.get(`https://api.beatquest.com/user/${uid}`);
        setUser(user.data.data);
      }
    };
    fetchUser();
  }, [location]);

  useEffect(() => {
    makeGraphData();
  }, [user]);

  const makeGraphData = () => {
    if (!user) return;
    let data = [];
    const matches = user.matches.sort(function (a, b) {
      var dateA = new Date(a.time),
        dateB = new Date(b.time);
      return dateA - dateB;
    });
    for (const match of matches) {
      console.log(match);
      data.push({ elo: parseInt(match.p1.elo.after) });
    }
    setGraphData(data);
  };

  const renderDurationTooltip = (o) => {
    const { payload } = o;
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
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {user ? (
        <div className="m-5">
          <div className="card bg-dark text-white m-5">
            <div className="card-body mx-5" style={{ height: 300 }}>
              <div class="row justify-content-start h-100">
                <div class="col-4">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="profile h-75 w-75"
                  />
                </div>
                <div class="col-7">
                  {user.name} <Rank rank={user.rank} />
                  <div style={{ fontSize: 22 }}>
                    <div class="d-flex justify-content-between">
                      <div>Wins</div>
                      <div>{user.wins}</div>
                    </div>
                    <div class="d-flex justify-content-between">
                      <div>Losses</div>
                      <div>{user.losses}</div>
                    </div>
                    <div class="d-flex justify-content-between">
                      <div>Matches</div>
                      <div>{user.matches.length}</div>
                    </div>
                    <div class="d-flex justify-content-between text-muted">
                      <div>Norms</div>
                      <div>{user.norms}</div>
                    </div>
                    <div class="d-flex justify-content-between text-muted">
                      <div>Maps</div>
                      <div>{user.wins + user.losses}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h2 class="mx-auto mt-1"> Elo Rating</h2>
            <LineChart
              className="mx-auto m-4"
              width={800}
              height={300}
              data={graphData}
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

              <Line
                type="monotone"
                dataKey="elo"
                stroke="#8884d8"
                dot={false}
              />
            </LineChart>

            <h2 class="mx-auto mt-5"> Recent Matches</h2>
            <table
              class="table table-dark m-4 mx-auto"
              style={{ width: 775, fontSize: 25 }}
            >
              <thead>
                <tr>
                  <th scope="col">Event</th>
                  <th scope="col">Players</th>
                  <th scope="col">Result</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserPage;
