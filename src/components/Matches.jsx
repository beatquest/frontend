import React from 'react';
import { Link } from 'react-router-dom';
import Delta from './Delta';

/**
 * 
 * @param   {String}  heading   The title of the matches.
 * @param   {Match[]} matches   Array of matches object to populate the table.
 * @param   {User?}   someUser  An optional User object that will add an extra "Result" column, specifying if the player won or lost when used
 * @returns {HTML div}          Formatted Table DOM element with "matches."
 */
export const Matches = ({heading="Recent Matches", matches, someUser=null}) => {
    const buildMatchRow = (match) => {
        return (
          <tr>
            <td>
              <Link
                  to={`/event/${match.event.id}`}
                >
                <img src={match.event.image} alt={match.event.image} height={75} />
              </Link>
            </td>
            <td>
              <div>
                <Link
                  to={`/user/${match.p1.id}`}
                >
                  {match.p1.name}
                </Link>{' '}
                <Delta delta={match.p1.elo.delta} />
              </div>
              <Link
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
            <ResultCell match={match} someUser={someUser} />
            <td class=" align-middle">
              {new Date(match.time).toLocaleDateString()}
            </td>
          </tr>
        );
    }
    let matchRows = matches.map(buildMatchRow);

    return (
        <div class="matches" >
          <h2 class="mx-auto mt-5">{heading}</h2>
          <table
          class="table table-dark m-5 mx-auto"
          >
            <thead>
              <tr>
              <th scope="col">Event</th>
              <th scope="col">Players</th>
              <th scope="col">Score</th>
              {(someUser) ? <th scope="col">Result</th> : <></>}
              <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>{matchRows}</tbody>
          </table>
        </div>
    )
  }
  
  const ResultCell = ({match, someUser=null}) => {
    if (!someUser) return <></>
  
    const user = someUser;
  
    const player = user.name === match.p1.name ? 'p1' : 'p2';
    
    const isWin = (delta) => {
      return delta > 0;
    };
  
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
    
    return <td class="text-center align-middle">{resultUI}</td>
  }