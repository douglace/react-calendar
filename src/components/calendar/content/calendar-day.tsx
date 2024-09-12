import { useMemo } from "react";
import { EventWeekType } from "../classes/CalendarEvent";
import { useCalendar } from "../useCalendar"
import moment from "moment";
import { MoreHorizontal } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

type CalendarDayProps = {
    day: moment.Moment
}

export default function CalendarDay({day}:CalendarDayProps) {
    const {getEventsByDay, getEventsByType} = useCalendar();
    const events = useMemo(() => getEventsByDay(day), [day]);
    //const {hourEvents, dayEvents} = useMemo(() => getEventsByType(day), [day]);
    const eventsCanShow =  useMemo(() => events.filter(e => e.position <= 4), [events]);
    const hidenEvents =  useMemo(() => events.filter(e => e.position > 4), [events]);

    
    return <article className="c-day ">
        {
            eventsCanShow.length == 0
            ? day.date()
            : eventsCanShow.map((a,i) => <EventItem key={i} event={a} day={day} />)
        }
        {
            hidenEvents.length > 0
            ? <div className="absolute bottom-1 left-0 w-full flex justify-center" title="plus d'evenements">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="bg-white px-1 rounded-[6px] shadow-md"> <MoreHorizontal size={14} /></TooltipTrigger>
                        <TooltipContent>
                            <p>+{hidenEvents.length} evenements</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            : null
        }
    </article>
}

function EventItem({event, day}:{event:EventWeekType, day: moment.Moment})
{   

    if (event.type == "hour") {
        return <div className={`event-item  --hour event-pos-${event.position}`}>
            <span className={`h-2 w-2 rounded-full ${event.event.color}`}></span>
            {event.event.from.format('HH:mm') +" - "+ event.event.to.format('HH:mm')} {event.event.title.substring(0, 20)}
        </div>
    }

    return <div className={`event-item ${event.event.color}   event-pos-${event.position} event-size-${event.duration}`}>
        {event.event.title.substring(0, 100)}
    </div>
}