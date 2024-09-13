"use client";

import {createContext, ReactNode, useEffect, useState} from "react";
import defaultEvents from "./events.json"
import useEventStore from "./store/useEventStore";
import { EventFormatedType } from "./classes/EventManager";

export type CalendarEvent = {
    fullday?: boolean,
    color: string,
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
};

export const CalendarContext = createContext<CalendarContextType>({
    events: [],
    date: new Date(),
    editDate: () =>{},
    setDateEvent: () =>{},
})


type CalendarProviderProps = {
    children: ReactNode;
    defaultDate?: Date
};

export function CalendarContextProvider ({children, defaultDate = new Date()}: CalendarProviderProps) {
    const [date, setDate] = useState<Date>(defaultDate);
    const {init, events, editEvent} = useEventStore();

    const editDate = (d:Date) => {
        setDate(d)
    }

    const addEvent = () => {

    }

    const setDateEvent = ({event, from, to}: {event: EventFormatedType, from:moment.Moment, to:moment.Moment}) => {
        editEvent({
            id: event.id,
            fullday: event.fullday,
            from: from.format("YYYY-MM-DD HH:mm:ss"),
            to: to.format("YYYY-MM-DD HH:mm:ss"),
            color: event.color,
            title: event.title
        });
    }

    useEffect(() => {
        init(defaultEvents);
    }, []);

    return <CalendarContext.Provider value={{
        events,
        setDateEvent,
        date,
        editDate,
    }}>
        {children}
    </CalendarContext.Provider>
}