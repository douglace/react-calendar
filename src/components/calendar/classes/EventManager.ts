import { CalendarEvent } from "@/components/calendar/calendar-provider";
import moment from 'moment';


export type EventFormatedType = {
    from:moment.Moment,
    to:moment.Moment,
    duration: number,
    title:string,
    color:string,
    id:string,
}

class EventManager {
    events: EventFormatedType[] = [];
    constructor(events:CalendarEvent[]) {
        this.events = events.map(this.initEvent.bind(this));
    }

    initEvent(ev:CalendarEvent): EventFormatedType {
        const from = moment(ev.from);
        const to = moment(ev.to);
        
        let res: EventFormatedType = {
            title: ev.title,
            color: ev.color,
            duration: to.diff(from, "days") +1,
            from: from,
            to: to,
            id: ev.id
        }
        return res
    }

    getEvents() {
        return this.events
    }

    
}

export default EventManager;