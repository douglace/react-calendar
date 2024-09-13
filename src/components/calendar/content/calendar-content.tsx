import { useContext, useMemo } from "react";
import { useCalendar } from "../useCalendar"
import CalendarDay from "./calendar-day"
import moment from 'moment';
import {DndContext, DragEndEvent, DragStartEvent, DragOverEvent} from '@dnd-kit/core';
import { EventWeekType } from "../classes/CalendarEvent";
import { CalendarContext } from "../calendar-provider";

export default function CalendarContent()
{
    const {groupWeek, isNextMonth, isPrevMonth} = useCalendar()
    const {setDateEvent} = useContext(CalendarContext)
    const days = useMemo(() => {
        let result:moment.Moment[] = [];
        for(let week of groupWeek) {
            for(let d of week) {
                result.push(d.day)
            }
        }
        return result;
    }, [groupWeek]);

    const handleDragEnd = (event:DragEndEvent) => {
        const current = event.active.data.current as EventWeekType
        const newFrom = event.over?.data.current?.day as moment.Moment
        const to = moment(newFrom).add(
            current.event.duration, 
            (current.type == "day" ? "d" : "h")
        );
        setDateEvent({
            event:current.event,
            from: newFrom,
            to: to
        });
        console.log(event, "end")
    }

    const handleDragStart= (event:DragStartEvent) => {
        //console.log(event, "start")
    }

    const handleDragOver= (event:DragOverEvent) => {
        //console.log(event, 'over')
    }

    
    return (
    <DndContext
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
    >
        <div className="calendar-content">
            {days.map(d => <CalendarDay day={d} key={d.date() + "-day" +( isNextMonth(d) ? "-next" : (isPrevMonth(d) ? "-prev" : ""))} />)}
        </div>
    </DndContext>
    )
}