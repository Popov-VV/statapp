import { throttle } from "throttle-debounce";

import { EventModel } from "../models/Event";
import { TrackInterface } from "../interfaces/tracker";
import { SenderConstructor, SenderInterface } from "../interfaces/sender";

class EventsService {
  sender: SenderInterface;

  buffer: EventModel[];
  eventToSend: EventModel[];

  constructor(SenderService: SenderConstructor) {
    this.sender = new SenderService();

    this.buffer = [];
    this.eventToSend = [];
  }

  newEvent: TrackInterface = (event, ...tags) => {
    const newEvent = new EventModel({
      event,
      tags: [...tags],
      url: "test",
      title: "title",
    });

    this.buffer.push(newEvent);
    this.checkSend();
  };

  checkSend() {
    if (this.buffer.length >= 3) {
      this.forceSendBuffer();
    } else {
      this.sendBufferThrottle();
    }
  }

  sendBufferThrottle = throttle(1000, this.sendBuffer);

  forceSendBuffer() {
    this.sendBufferThrottle.cancel({ upcomingOnly: true });
    this.sendBuffer();
  }

  async sendBuffer() {
    if (!this.buffer.length) return;

    this.eventToSend = [...this.buffer];
    this.buffer = [];

    try {
      await this.sender.send(this.eventToSend);
      this.eventToSend = [];
    } catch (err) {
      this.returnToBooferEventToSend();
      this.checkSend();
    }
  }

  returnToBooferEventToSend() {
    this.buffer.unshift(...this.eventToSend);
    this.eventToSend = [];
  }
}

export { EventsService };
