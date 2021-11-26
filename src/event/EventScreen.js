/*
> transition from clicking on the specific event
Matches
{ An idividual match
(rank logo) Player 1 (Elo before) vs. (rank logo) [Player 2 ](links to the individual player)(Elo before)
Score: 2-0 (this comes from the players)
}
*/

import React, {useState, useEffect} from 'react';
import { loadEvent } from "./EventRepository";
import parse from 'html-react-parser';

export function EventScreen({ id="k_2147484231" }) {

    const [info, setInfo] = useState({});
    const [matches, setMatches] = useState({});

    useEffect(() => {
        async function fetchEvent() {
            try{
                const data = await loadEvent(id);
                // setEvent(data);
                console.log(data);
                setInfo(data.info);
                setMatches(data.matches);
            } catch (error) {
                console.log(error);
            }
        }
        fetchEvent();
    }, [id]);

    let eventSources = info.links ? Object.keys(info.links).map((source, _) => {
        return (
            <tr key={`source_${source}_${info.id}`}>
                <td className="sourceName">
                    <a href={info.links[source]} target="_blank"  rel="noreferrer">
                        {capitalize(source)}
                    </a>
                </td>
            </tr>
        )
    }) : <div>Loading...</div>;

    return info ? (
        <div className="App-header">
            <img src={info.image} alt={info.name} className="profile" />
            <h1 className="eventName">{info.name}</h1>
            <h3>{renderDateRange(info.dates)}</h3> 
            <h2 className="description mt-5 mb-3">Description</h2>
            <EventDescription descrptionHTML={info.description}/>
            <Links links={info.links} />
            <h2 className="matches mt-5 mb-3">Matches</h2>

            {/* TODO: Integrate in the other matche table rows, sorted chrnologically? */}
        </div>
    ) : <p>Loading...</p>;
    
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