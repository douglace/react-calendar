
import { EventWeekType } from "../classes/CalendarEvent";
import moment from "moment";
import {useDraggable} from '@dnd-kit/core';

export default function EventItem({event, day}:{event:EventWeekType, day: moment.Moment})
{   
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: 'event-'+event.event.id+'-'+day.date(),
        data: {
            ...event,
            day: day
        },
    
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;
    

    if (event.type == "hour") {
        return <div 
                className={`event-item  --hour event-pos-${event.position}`}
                ref={setNodeRef} style={style} {...listeners} {...attributes}
            >
            <span className={`h-2 w-2 rounded-full ${event.event.color}`}></span>
            {event.event.from.format('HH:mm') +" - "+ event.event.to.format('HH:mm')} {event.event.title.substring(0, 20)}
        </div>
    }

    return <div 
            className={`event-item ${event.event.color} event-pos-${event.position} event-size-${event.duration}`}
            ref={setNodeRef} style={style} {...listeners} {...attributes}
        >
        {event.event.title.substring(0, 100)}
    </div>
}