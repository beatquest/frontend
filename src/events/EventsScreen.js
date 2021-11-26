import React, {useState, useEffect} from 'react';
import { getEvents as loadEvents } from './EventsRepository';


export function EventOverviewScreen() {
  return (
    <div className="App-header">
      <h1>Events</h1>
      <EventsTable />
    </div>
  )
}

function EventsTable() {

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
            <img src={eventPreview.image} alt={eventPreview.name} className="profile" />
            {eventPreview.name}
          </td>
          <td>{eventPreview.matches} Matches</td>
        </tr>
      )
    });

    return (
      <table className="table table-dark mt-5">
        <thead>
          <tr>
            <th className="events" scope="col"></th>
            <th className="matches" scope="col">Matches</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    );
}