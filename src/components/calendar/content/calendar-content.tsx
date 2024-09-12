import { useMemo } from "react";
import { useCalendar } from "../useCalendar"
import CalendarDay from "./calendar-day"
import moment from 'moment';

export default function CalendarContent()
{
    const {groupWeek, isNextMonth, isPrevMonth} = useCalendar()

    const days = useMemo(() => {
        let result:moment.Moment[] = [];
        for(let week of groupWeek) {
            for(let d of week) {
                result.push(d.day)
            }
        }
        return result;
    }, [groupWeek])

    
    return (<div className="calendar-content">
        {days.map(d => <CalendarDay day={d} key={d.date() + "-day" +( isNextMonth(d) ? "-next" : (isPrevMonth(d) ? "-prev" : ""))} />)}
    </div>)
}