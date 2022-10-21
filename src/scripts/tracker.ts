import { ApiService } from './ApiService'
import { EventsService } from './EventsService'
import { TrackerInterface } from '../interfaces/tracker'


const eventService = new EventsService(ApiService)

const tracker = (): TrackerInterface => {
    return {
        track(...tags) {
            eventService.newEvent(...tags)
        }
    }
}

declare global {
    interface Window {
        tracker: TrackerInterface
    }
}


window.tracker = tracker()

window.addEventListener('beforeunload', (event) => {
    eventService.forceSendBuffer()
    event.preventDefault();
});