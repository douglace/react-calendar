import { useCalendar } from "../useCalendar"

type CalendarDayProps = {
    day: number
}

export default function CalendarDay({day}:CalendarDayProps) {
    const {getEventFromDay} = useCalendar();
    const events = getEventFromDay(day);

    if (events == null) {
        return <article className="c-day">
            {day}
        </article>
    }

    return <article className="c-day flex-col p-1 gap-1">
        {events.map((a,i) => <p key={i} className="bg-white border rounded-sm flex overflow-hidden truncate">{a.title}</p>)}
    </article>
}