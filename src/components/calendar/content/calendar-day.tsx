import { useMemo } from "react";
import { EventWeekType } from "../classes/CalendarEvent";
import { useCalendar } from "../useCalendar"
import moment from "moment";

type CalendarDayProps = {
    day: moment.Moment
}

export default function CalendarDay({day}:CalendarDayProps) {
    const {getEventsByDay} = useCalendar();
    const events = useMemo(() => getEventsByDay(day), [day]);
    
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
    return <div className={`event-item  ${event.event.color} event-pos-${event.position} event-size-${event.duration}`}>
        {event.event.title.substring(0, 100)}
    </div>
}