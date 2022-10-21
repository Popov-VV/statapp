import { throttle } from 'throttle-debounce';

import { EventModel } from '../models/Event'
import { TrackInterface } from '../interfaces/tracker';
import { SenderConstructor, SenderInterface } from '../interfaces/sender';


class EventsService { 
    sender: SenderInterface

    buffer: EventModel[]
    eventToSend: EventModel[]

    constructor(SenderService: SenderConstructor) {
        this.sender = new SenderService();

        this.buffer = [];
        this.eventToSend = [];
    }

    newEvent: TrackInterface = (event, ...tags) => {        
        const newEvent = new EventModel({
            event,
            tags: [...tags],
            url: 'test',
            title: 'title',
        })


        this.buffer.push(newEvent)
        this.checkSend()
    }

    checkSend() {
        if ((this.eventToSend.length + this.buffer.length) >= 3) {
            this.forceSendBuffer()
        } else {
            console.log('trottle send', this.buffer); 
            this.sendBufferThrottle()
        }
    }

    sendBufferThrottle = throttle(30000, this.sendBuffer)

    forceSendBuffer() {
        console.log('forceSendBuffer start');
        
        this.sendBufferThrottle.cancel({ upcomingOnly: true })
        this.returnToBooferEventToSend()
        this.sendBuffer()
    } 

    async sendBuffer() {
        if (!this.buffer.length) return
        console.log('sendBuffer start', this.buffer);

        this.eventToSend = [...this.buffer];
        this.buffer = []

        try {
            this.sender.send(this.eventToSend)
            this.eventToSend = []
        } catch (err) {
            console.error(err);

            this.returnToBooferEventToSend()
            this.checkSend()
        }
    }

    returnToBooferEventToSend() {
        console.log('returnToBooferEventToSend start');
        
        this.buffer.unshift(...this.eventToSend)
        this.eventToSend = [];
    }    
}

export { EventsService }