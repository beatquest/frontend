/*
> transition from clicking on the specific event
Matches
{ An idividual match
(rank logo) Player 1 (Elo before) vs. (rank logo) [Player 2 ](links to the individual player)(Elo before)
Score: 2-0 (this comes from the players)
}
*/

// TODO: Sort matches

import React, {useState, useEffect} from 'react';
import { useLocation, Link } from 'react-router-dom';
import { loadEvent } from "./EventRepository";
import parse from 'html-react-parser';
import { Matches } from '../../components/Matches';

export function EventPage() {

    const location = useLocation();
    const [event, setEvent] = useState(null);
    const [info, setInfo] = useState();
    const [matches, setMatches] = useState([]);

    useEffect(() => {
      // Moved inside the function (see react-hooks/exhaustive-deps)
      const fetchEvent = async () => {
        if (location.pathname) {
          const id = location.pathname.split('/')[2];
          const data = await loadEvent(id);
          data.matches = data.matches.sort(sortByLatestDate);
          setEvent(data);
  
          console.log(data);
        }
      }

      window.scrollTo(0,0);
      fetchEvent();
    }, [location]);

    useEffect(() => {
      const populateUI = () => {
        if (!event) return;
  
        setInfo(event.info);
        setMatches(event.matches);
      }

      populateUI();
    }, [event]);

    const sortByLatestDate = (a, b) => {
      let dateA = new Date(a.time),
          dateB = new Date(b.time);
      return dateB - dateA;
    } 

    return <div className="App-header">
        {info ? (
            <div class="event">
                <img src={info.image} alt={info.name} className="profile" />
                <h1 className="eventName">{info.name}</h1>
                <h3>{renderDateRange(info.dates)}</h3>
                <h2 className="description mt-5 mb-3">Description</h2>
                <EventDescription descrptionHTML={info.description}/>
                <Links links={info.links} />
                <Matches matches={matches} />
                <Link
                    style={{ textDecoration: 'none', color: 'white' }}
                    to={`/events`}
                >
                    See all events
                </Link>
            </div>
        ) : <p>Loading...</p>}
    </div>;
}

function capitalize(word) {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
}

function renderDateRange(dateRange, locale="en-us") {
    if (dateRange != null) {
        var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
        let startDate = new Date(dateRange.start);
        let endDate = new Date(dateRange.end);
        return `${startDate.toLocaleDateString(locale, options)} - ${endDate.toLocaleDateString(locale, options)}`;
    } else {
        return "No dates reported."
    }
}

const EventDescription = ({descrptionHTML}) => {
    return <div class="EventDescription">
        { descrptionHTML ?
            parse(descrptionHTML) :
            <p>"No Description. Just a cool event!"</p>
        }
    </div>
}

const Links = ({links}) => {
    let eventSources = links ? Object.keys(links).map((source, _) => {
        return (
            <tr key={`source_${source}`}>
                <td className="sourceName">
                    <a href={links[source]} target="_blank"  rel="noreferrer">
                        {capitalize(source)}
                    </a>
                </td>
            </tr>
        )
    }) : <tr>Loading...</tr>;

    return (
        <div className="Links">
            <h2 className="Links mt-5 mb-3">Links</h2>
            <table className="table table-dark">
                <tbody>
                    {eventSources}
                </tbody>
            </table>
        </div>
    )
}

