import { cn } from "@/lib/utils"
import { useCalendar } from "../useCalendar"
import CalendarDay from "./calendar-day"

export default function CalendarContent()
{
    const {escapeDays, days} = useCalendar()
    const scape = Array.from({ length: escapeDays }, (_, index) => index);
    return (<div className="calendar-content">
        {scape.map(s => <div key={s}></div>)}
         
        {days.map(d => <CalendarDay day={d.date()} key={d.date() + "-daty"} />)}
    </div>)
}