import axios from 'axios';

const eventsKey = `beatquest_events`;
const apiURI = "https://api.beatquest.com";
const eventsRoute = "/events";

/**
 * Tries to fetch event from endpoint asynchronously.
 * If not available, the function checks if there is
 * a cache of `events` in localStorage, before just
 * returning an empty array (WIP).
 * @returns Array of events
 */
export async function getEvents() {
    let events = [];
    const eventsEndpoint = apiURI + eventsRoute;
    const response = await axios.get(eventsEndpoint);
    if (response.data.success) {
        localStorage[eventsKey] = JSON.stringify(response.data);
        events = response.data.data;
    } else if (localStorage[eventsKey] !== undefined) {
        let cachedData = localStorage[eventsKey];
        events = cachedData.data;
    } 

    return events.sort().reverse();
}