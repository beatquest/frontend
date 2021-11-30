import React, {useState, useEffect} from 'react';
import loadEvents from './EventsRepository';
import { Link } from 'react-router-dom';

export default function EventsTable() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const currentEvents = await loadEvents();
                console.log(`Successfully set events to ${currentEvents[0].name}`);
                setEvents(currentEvents);
            } catch (error) {
                console.error(error);
            }
        }
        fetchEvents();
    }, []);

    const tableRows = events.map((eventPreview, _) => {
      console.log(`eventPreview.id: ${eventPreview.id}`);
      return (
        <tr key={eventPreview.id}>
          <td>
            {<Link to={`/event/${eventPreview.id}`}>
              <img src={eventPreview.image} alt="" className="profile" />
            </Link>}
            {<Link className="event-name" to={`/event/${eventPreview.id}`}>{eventPreview.name}</Link>}
            <p className="text-muted d-none">{eventPreview.matches} Matches</p>
          </td>
          <td className="event-matches">{eventPreview.matches} Matches</td>
        </tr>
      )
    });

    return (
      <table className="table table-dark">
        <thead>
          <tr>
            <th className="events" scope="col">Event</th>
            <th className="matches event-matches" scope="col">Matches</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    );
}
