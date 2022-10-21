import { EventModel } from '../models/Event'

export type SenderFunction = (event: EventModel[]) => 'success' | 'error'

export interface SenderInterface {
    send: SenderFunction
}

export interface SenderConstructor {
    new (): SenderInterface;
}
