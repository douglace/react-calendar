import { useMemo, useState } from "react";
import { useCalendar } from "../useCalendar"
import moment from "moment";
import { AnimatePresence, useAnimate } from "framer-motion"
import EventItem from "./event-item";
import { MotionEventsDayBox } from "./events-day-box";
import { EventDayVariant, MoreEventVariant } from "../anim/variant";
import { MotionMoreEvents } from "./more-events";
import { PlusIcon } from "lucide-react";
import {useDroppable} from '@dnd-kit/core';

type CalendarDayProps = {
    day: moment.Moment
}

export default function CalendarDay({day}:CalendarDayProps) {
    const {getEventsByDay} = useCalendar();
    const events = useMemo(() => getEventsByDay(day), [day]);
    const eventsCanShow =  useMemo(() => events.filter(e => e.position <= 4), [events]);
    const hidenEvents =  useMemo(() => events.filter(e => e.position > 4), [events]);
    const [open, setOpen] = useState(false);
    const [scope, animate] = useAnimate();

    const {isOver, setNodeRef} = useDroppable({
        id: "day-"+day.unix(),
        data: {
            day: day
        }
    });

    const style = {
        backgroundColor: isOver ? 'green' : undefined,
    };
    

    const showAddButton = () => {
        animate('.add-event', {opacity: 1, scale: 1})
    }

    const hiddenAddButton = () => {
        animate('.add-event', {opacity: 0, scale: 0})
    }
    
    return <article ref={scope} className="c-day" 
        onMouseEnter={showAddButton}
        onMouseLeave={hiddenAddButton}
    >
        <div 
            className="day-wrapper h-full w-full"
            ref={setNodeRef} style={style}
        >
            <AnimatePresence mode="wait">
                {
                    open
                    ? <MotionEventsDayBox 
                        layoutId={"events"+day.unix()} 
                        variants={EventDayVariant} 
                        animate={"animate"}
                        initial={"initial"}
                        exit={"exit"}
                        transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
                        onClose={() => setOpen(false)}
                    />
                    : null
                }
            </AnimatePresence>
            
            {
                eventsCanShow.length == 0
                ? day.date()
                : eventsCanShow.map((a,i) => <EventItem key={i} event={a} day={day} />)
            }

            <div className="day-bottom">
                {
                    hidenEvents.length > 0
                    ? <AnimatePresence>
                            {
                                !open
                                ? <MotionMoreEvents
                                    triggerOpen={() => setOpen(true)}
                                    totalEvent={hidenEvents.length}
                                    layoutId={"events"+day.unix()} 
                                    animate={"animate"}
                                    initial={"initial"}
                                    exit={"exit"}
                                    transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
                                    variants={MoreEventVariant}
                                />
                                : null
                            }
                        </AnimatePresence>
                    : null
                }
                <button className="add-event"> <PlusIcon size={10} /> </button>
            </div>
        </div>
    </article>
}
