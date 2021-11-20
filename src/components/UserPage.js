import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Rank from './Rank';

const UserPage = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);

  console.log(user);

  useEffect(() => {
    const fetchUser = async () => {
      const users = (await axios.get('https://api.beatquest.com/leaderboard'))
        .data.data;
      setUser(
        users.find((user) => user.name === location.pathname.split('/')[1])
      );
    };
    fetchUser();
  }, [location]);

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

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
                      <div>{user.matches}</div>
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

            <LineChart
              className="mx-auto mx-5 mb-5"
              width={800}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserPage;
