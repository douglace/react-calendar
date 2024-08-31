import { EventWeekType } from "../classes/CalendarEvent";
import { useCalendar } from "../useCalendar"
import moment from "moment";

type CalendarDayProps = {
    day: moment.Moment
}

export default function CalendarDay({day}:CalendarDayProps) {
    const {getEventsByDay} = useCalendar();
    const events = getEventsByDay(day);

    

    return <article className="c-day flex-col p-1 gap-1">
        {
            events.length == 0
            ? day.date()
            : events.map((a,i) => <CalendarDayItem key={i} event={a} day={day} />)
        }
    </article>
}

function CalendarDayItem({event}:{event:EventWeekType, day: moment.Moment})
{   
    return <div className={`border rounded-sm flex overflow-hidden  ${event.event.color} event-pos-${event.position} event-size-${event.duration}`}>
        {event.event.title.substring(0, 100)}
    </div>
}