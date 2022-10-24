import { EventModel } from "../models/Event";

export type SenderFunction = (
  event: EventModel[]
) => Promise<"success" | Error>;

export interface SenderInterface {
  send: SenderFunction;
}

export interface SenderConstructor {
  new (): SenderInterface;
}
