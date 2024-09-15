import { useMemo } from "react";
import { useCalendar } from "../useCalendar"
import CalendarDay from "./calendar-day"
import moment from 'moment';
import {
    DndContext, 
    DragEndEvent, 
    DragStartEvent, 
    DragOverEvent, 
    useSensor, 
    PointerSensor,
    MouseSensor,
    TouchSensor,
    KeyboardSensor,
    useSensors
} from '@dnd-kit/core';
import { EventWeekType } from "../classes/CalendarEvent";
import { useCalenderContext } from "../calendar-provider";

export default function CalendarContent()
{
    const {groupWeek, isNextMonth, isPrevMonth} = useCalendar()
    const {setDateEvent} = useCalenderContext()
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
        const newFrom = event.over?.data.current?.day as moment.Moment;
        
        if (current.from.format("YYYY-MM-DD HH:mm:ss") == newFrom?.format("YYYY-MM-DD HH:mm:ss") || !newFrom) {
            return;
        }
        
        newFrom.set({
            hour: current.event.from.get('hour'), 
            minute: current.event.from.get('minute'), 
            second: current.event.from.get('second'), 
        })

        const to = moment(newFrom).add(
            (current.event.duration - 1), 
            (current.type == "day" ? "d" : "h")
        );

        setDateEvent({
            event:current.event,
            from: newFrom,
            to: to
        });
    }

    const handleDragStart= (event:DragStartEvent) => {
        return; 
        //console.log(event, "start")
    }

    const handleDragOver= (event:DragOverEvent) => {
        return;
        //console.log(event, 'over')
    }

    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint: {
          distance: 0.01
        }
      })
      const mouseSensor = useSensor(MouseSensor)
      const touchSensor = useSensor(TouchSensor)
      const keyboardSensor = useSensor(KeyboardSensor)
    
      const sensors = useSensors(
        mouseSensor,
        touchSensor,
        keyboardSensor,
        pointerSensor
      )

    
    return (
    <DndContext
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        sensors={sensors}
    >
        <div className="calendar-content">
            {days.map(d => <CalendarDay day={d} key={d.date() + "-day" +( isNextMonth(d) ? "-next" : (isPrevMonth(d) ? "-prev" : ""))} />)}
        </div>
    </DndContext>
    )
}