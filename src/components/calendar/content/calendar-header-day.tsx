import { useCalendar } from "../useCalendar"

export default function CalendarHeaderDay()
{
    const { daysOfWeek } = useCalendar()
    return <aside className="c-header-day">
        {daysOfWeek.map(d => <div key={d} className="c-header-day-item">
            {d}
        </div>)}
    </aside>
}