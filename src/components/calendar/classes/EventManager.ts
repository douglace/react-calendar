import { CalendarEvent } from "@/components/calendar/calendar-provider";
import moment from 'moment';


export type EventFormatedType = {
    from:moment.Moment,
    to:moment.Moment,
    fullday?: boolean,
    type: "day"|"hour",
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
        const durationInHour = to.diff(from, "hours");
        const duration = to.diff(from, "days") +1;
        const type = durationInHour < 24 ? "hour" : "day";
        
        let res: EventFormatedType = {
            title: ev.title,
            color: ev.color,
            duration: type === "day" ? duration : durationInHour,
            fullday: ev.fullday,
            type: type,
            from: from,
            to: to,
            id: ev.id
        }

        if (ev.id == "17") {
            console.log(res, to.diff(from, "hours"))
        }
        return res
    }

    getEvents() {
        return this.events
    }

    
}

export default EventManager;