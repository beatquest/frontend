import axios from 'axios';

const eventKey = `beatquest_event`;
const apiURI = "https://api.beatquest.com";
const eventsRoute = "/event/";

/**
 * Tries to fetch event from endpoint asynchronously.
 * If not available, the function checks if there is
 * a cache of `events` in localStorage, before just
 * returning an empty array (WIP).
 * @returns Array of events
 */
export async function loadEvent(eventId) {
    let uniqueEventKey = eventKey + eventId;
    let event = {};
    const eventEndpoint = apiURI + eventsRoute + eventId;
    const response = await axios.get(eventEndpoint);
    if (response.data.success) {
        console.log(`Successfully retrieved data for event ${eventId}`);
        localStorage[uniqueEventKey] = JSON.stringify(response.data);
        event = response.data.data;
    } else if (localStorage[uniqueEventKey] !== undefined) {
        console.log(`Using cached data for event ${eventId}`);
        let cachedData = localStorage[uniqueEventKey];
        event = cachedData.data;
    }  else {
        console.log(`Unable to reach server and there was not a local cache of event with id ${eventId}`);
    }

    return event;
}