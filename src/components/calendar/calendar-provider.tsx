"use client";

import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import defaultEvents from "./events.json"
import useEventStore from "./store/useEventStore";
import { EventFormatedType } from "./classes/EventManager";

export type CalendarEvent = {
    type: "day"|"hour",
    fullday?: boolean,
    color: string,
    description: string,
    title: string,
    from: string,
    to: string,
    id: string,
}
type CalendarContextType = {
    events: CalendarEvent[],
    setDateEvent: (data:{
        event: EventFormatedType, 
        from:moment.Moment, 
        to:moment.Moment
    }) => void,
    date: Date,
    editDate: (date:Date) => void;
    addEvent: ({event}:{event: Omit<EventFormatedType, 'duration'>}) => void;
    setEvent: ({event}:{event: Omit<EventFormatedType, 'duration'>}) => void;
    deleteEvent: ({eventId}:{eventId: string}) => void;
};

export const CalendarContext = createContext<CalendarContextType>({
    events: [],
    date: new Date(),
    editDate: () =>{},
    setDateEvent: () =>{},
    addEvent: () =>{},
    setEvent: () =>{},
    deleteEvent: () =>{},
})


type CalendarProviderProps = {
    children: ReactNode;
    defaultDate?: Date
};

export function CalendarContextProvider ({children, defaultDate = new Date()}: CalendarProviderProps) {
    const [date, setDate] = useState<Date>(defaultDate);
    const {init, events, editEvent, addEvent, removeEvent} = useEventStore();

    const editDate = (d:Date) => {
        setDate(d)
    }

    const handleAddEvent = ({event}: {event: Omit<EventFormatedType, 'duration'>}) => {
        
        addEvent({
            ...event,
            from: event.from.format("yyy-MM-DD HH:mm:ss"),
            to: event.to.format("yyy-MM-DD HH:mm:ss"),
        });
    }

    const setDateEvent = ({event, from, to}: {event: EventFormatedType, from:moment.Moment, to:moment.Moment}) => {
        editEvent({
            ...event,
            from: from.format("YYYY-MM-DD HH:mm:ss"),
            to: to.format("YYYY-MM-DD HH:mm:ss"),
        });
    }

    const deleteEvent = ({eventId}: {eventId: string}) => {
        removeEvent(eventId)
    }

    const setEvent = ({event}:{event: Omit<EventFormatedType, 'duration'>}) => {
        editEvent({
            ...event,
            from: event.from.format("YYYY-MM-DD HH:mm:ss"),
            to: event.to.format("YYYY-MM-DD HH:mm:ss"),
        });
    }


    useEffect(() => {
        if (events.length == 0) {
            init(defaultEvents as CalendarEvent[]);
            
        }
    }, []);

    return <CalendarContext.Provider value={{
        events,
        setDateEvent,
        date,
        editDate,
        deleteEvent,
        setEvent,
        addEvent: handleAddEvent
    }}>
        {children}
    </CalendarContext.Provider>
}

export function useCalenderContext() {
    const context = useContext(CalendarContext);

    if (!context) throw "You most call this function inside de provider"

    return context;
}