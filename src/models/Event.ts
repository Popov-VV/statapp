export class EventModel {
    event: string
	tags: string[]
	url: string
	title: string
    ts?: Date = new Date()

    constructor(props: EventModel) {
        if (!props.event || !props.url || !props.title) {
            throw new Error('Can`t create event.')
        }
        
        this.event = props.event
        this.tags = props.tags || []
        this.url = props.url
        this.title = props.title
        this.ts = props.ts || new Date()
    }
}