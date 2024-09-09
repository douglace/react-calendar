import { useMemo } from "react";
import { EventWeekType } from "../classes/CalendarEvent";
import { useCalendar } from "../useCalendar"
import moment from "moment";

type CalendarDayProps = {
    day: moment.Moment
}

export default function CalendarDay({day}:CalendarDayProps) {
    const {getEventsByDay, getEventsByType} = useCalendar();
    const events = useMemo(() => getEventsByDay(day), [day]);
    const {hourEvents, dayEvents} = useMemo(() => getEventsByType(day), [day]);
    const eventsCanShow =  useMemo(() => events.filter(e => e.position <= 3), [events]);

    if (day.date() == 11) {
        console.log(eventsCanShow, events, hourEvents.length, dayEvents.length);
    }
    
    return <article className="c-day ">
        {
            events.length == 0
            ? day.date()
            : events.map((a,i) => <EventItem key={i} event={a} day={day} />)
        }
    </article>
}

function EventItem({event}:{event:EventWeekType, day: moment.Moment})
{   
    if (event.type == "hour") {
        return <div className={`event-item  flex items-center gap-1 !border-0 bg-black text-white mx-2`}>
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            {event.event.from.format('HH:mm') +" - "+ event.event.to.format('HH:mm')} {event.event.title.substring(0, 20)}
        </div>
    }

    return <div className={`event-item  ${event.event.color} event-pos-${event.position} event-size-${event.duration}`}>
        {event.event.title.substring(0, 100)}
    </div>
}