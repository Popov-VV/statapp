import { validate } from "validate.js";

export interface EventInterface {
  event: string;
  tags: string[];
  url: string;
  title: string;
  ts?: Date | string;
}

export class EventModel implements EventInterface {
  event: string;
  tags: string[];
  url: string;
  title: string;
  ts?: Date;

  constructor(props: EventInterface) {
    this.event = props.event;
    this.tags = props.tags || [];
    this.url = props.url;
    this.title = props.title;

    if (typeof props.ts === "string") {
      this.ts = new Date(props.ts);
    } else if (!props.ts) {
      this.ts = new Date();
    }

    try {
      this.validate();
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
      throw new Error("Can`t create event.");
    }
  }

  static createInstance(event: EventInterface) {
    return new EventModel(event);
  }

  validate() {
    let constraints = {
      event: {
        presence: true,
        type: "string",
      },
      url: {
        url: {
          allowLocal: true,
        },
      },
      title: {
        presence: true,
        type: "string",
      },
      tags: (value: any[]) => {
        try {
          value.every((tag) => {
            if (typeof tag !== "string") {
              throw new Error("Tag must be a string");
            }
          });
        } catch (e) {
          return {
            tags: {
              message: e instanceof Error ? e.message : "Tags not valid.",
            },
          };
        }

        return null;
      },
      ts: (value: any) => {
        if (value instanceof Date && value.toDateString() !== "Invalid Date")
          return null;

        return {
          ts: {
            message: "Date not valid",
          },
        };
      },
    };

    validate(
      {
        event: this.event,
        url: this.url,
        title: this.title,
        tags: this.tags,
        ts: this.ts,
      },
      constraints
    );
  }
}
