
import { EventWeekType } from "../classes/CalendarEvent";
import moment from "moment";
import {useDraggable} from '@dnd-kit/core';
import { motion, useAnimate } from "framer-motion"
import { PenIcon, TrashIcon } from "lucide-react";
import { useCalenderContext } from "../calendar-provider";

export default function EventItem({event, day}:{event:EventWeekType, day: moment.Moment})
{   
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: 'event-'+event.event.id+'-'+day.date(),
        data: {
            ...event,
            day: day
        },
    });
    
    const { deleteEvent } = useCalenderContext()

    const [scope, animate] = useAnimate();

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    const handleHoverIn = async () => {
        await animate(".button-delete-event, .button-edit-event",  {
            scale: 1, 
            y: "-50%",
            // transform: 'translate(0, -50%)'
        }, { duration: .2 });
    }

    const handleHoverOut = () => {
        animate(".button-delete-event, .button-edit-event",  {
            scale: 0, 
            y: 0,
            // transform: 'translate(0, -50%)'
        }, { duration: .2 });
    }

    const EditEventButton = () => {
        return <motion.button 
            className="button-edit-event"
            whileHover={{
                scale: 1.15,
                backgroundColor: "#06b6d4",
                color: "#fff"
            }}
            >
            <PenIcon size={8} />
        </motion.button>
    }

    const DeleteEventButton = () => {
        return <motion.button 
                className="button-delete-event z-[1000]"
                whileHover={{
                    scale: 1.15,
                    backgroundColor: "#ef4444",
                    color: "#fff"
                }}
                whileTap={{
                    scale: 2.15,
                }}
                onClick={(e) =>  {
                    e.stopPropagation();
                    deleteEvent({eventId: event.event.id});
                }}
            >
            <TrashIcon size={8} />
        </motion.button>
    }

    if (event.type == "hour") {
        return <motion.div
            onMouseEnter={handleHoverIn}
            onMouseLeave={handleHoverOut}
            className={`event-item  --hour event-pos-${event.position}`}
            style={style} 
            ref={setNodeRef} 
            {...listeners} 
            {...attributes}
        >
        <span className={`h-2 w-2 rounded-full`} style={{backgroundColor: event.event.color}}></span>
        {event.event.from.format('HH:mm') +" - "+ event.event.to.format('HH:mm')} {event.event.title.substring(0, 8)}...

        <div ref={scope}>
            <EditEventButton />
            <DeleteEventButton />
        </div>
    </motion.div>
    }

    
    

    return  <motion.div 
            onMouseEnter={handleHoverIn}
            onMouseLeave={handleHoverOut}
            ref={setNodeRef} 
            className={`event-item  event-pos-${event.position} event-size-${event.duration}`}
            style={{...style, backgroundColor: event.event.color}} 
            {...listeners} 
            {...attributes}
        >
        {event.event.title.substring(0, 50)}
        <div ref={scope}>
            <EditEventButton />
            <DeleteEventButton />
        </div>
    </motion.div>

    
}