import { useMemo, useState } from "react";
import { useCalendar } from "../useCalendar"
import moment from "moment";
import { AnimatePresence, useAnimate, motion } from "framer-motion"
import EventItem from "./event-item";
import { MotionEventsDayBox } from "./events-day-box";
import { EventDayVariant, MoreEventVariant } from "../anim/variant";
import { MotionMoreEvents } from "./more-events";
import { PlusIcon } from "lucide-react";
import {useDroppable} from '@dnd-kit/core';
import { MotionEventsFormBox } from "./events-form-box";

type CalendarDayProps = {
    day: moment.Moment
}

export default function CalendarDay({day}:CalendarDayProps) {
    const {getEventsByDay, isNextMonth, isPrevMonth} = useCalendar();
    const events = useMemo(() => getEventsByDay(day), [day]);
    const eventsCanShow =  useMemo(() => events.filter(e => e.position <= 4), [events]);
    const hidenEvents =  useMemo(() => events.filter(e => e.position > 4), [events]);
    const [open, setOpen] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [scope, animate] = useAnimate();

    const {isOver, setNodeRef} = useDroppable({
        id: "day-"+day.unix(),
        data: {
            day: day,
            id: "day-"+day.unix()
        }
    });

    const style = {
        backgroundColor: isOver ? '#5FAD56' : undefined,
    };

    const opacity = useMemo(() => isNextMonth(day) || isPrevMonth(day) ? .5 : 1, [day]);
    

    const showAddButton = () => {
        animate('.add-event', {opacity: 1, scale: 1, rotate: "90deg"})
    }

    const hiddenAddButton = () => {
        animate('.add-event', {opacity: 0, scale: 0, rotate: "-90deg"})
    }
    
    return <article ref={scope} 
        className="c-day" 
        onMouseEnter={showAddButton}
        onMouseLeave={hiddenAddButton}
    >
        <motion.div 
            className="day-wrapper h-full w-full"
            ref={setNodeRef} style={style}
            
        >
            <div 
                className="absolute inset-0 bg-background"
                style={{
                    ...style,
                    opacity: opacity,
                }}
            >

            </div>
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
                        day={day}
                    />
                    : null
                }
                {
                    openForm
                    ? <MotionEventsFormBox 
                        layoutId={"form"+day.unix()}
                        variants={EventDayVariant} 
                        animate={"animate"}
                        initial={"initial"}
                        exit={"exit"}
                        transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
                        onClose={() => setOpenForm(false)}
                        currenDate={day}
                    />
                    : null
                }
            </AnimatePresence>
            
            {
                eventsCanShow.length == 0
                ? null
                : eventsCanShow.map((a,i) => <EventItem key={i} event={a} day={day} />)
            }
            <div className="event-day-value" style={{  opacity: opacity }}>{day.date()}</div>
            <AnimatePresence mode="wait">
                {
                    !openForm
                    ?   <motion.button 
                            className="animate-form-start"
                            onClick={() => setOpenForm(true)}
                            layoutId={"form"+day.unix()}
                        > 
                        
                        </motion.button>
                    : null
                }
            </AnimatePresence>

            <div className="day-bottom">
                <AnimatePresence mode="wait">
                    {
                        hidenEvents.length > 0
                        ?   (
                                !open
                                ? <MotionMoreEvents
                                    triggerOpen={() => setOpen(true)}
                                    totalEvent={events.length}
                                    layoutId={"events"+day.unix()} 
                                    animate={"animate"}
                                    initial={"initial"}
                                    exit={"exit"}
                                    transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
                                    variants={MoreEventVariant}
                                />
                                : null
                            )
                        : null
                    }
                </AnimatePresence>
                <button 
                    className="add-event"
                    onClick={() => setOpenForm(true)}
                > 
                    <PlusIcon size={10} /> 
                </button>
            </div>
        </motion.div>
    </article>
}
