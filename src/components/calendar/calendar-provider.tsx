"use client";

import {createContext, ReactNode, useState} from "react";
import events from "./events.json"

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
    date: Date,
    editDate: (date:Date) => void;
};

export const CalendarContext = createContext<CalendarContextType>({
    events: [],
    date: new Date(),
    editDate: () =>{},
})


type CalendarProviderProps = {
    children: ReactNode;
    defaultDate?: Date
};

export function CalendarContextProvider ({children, defaultDate = new Date()}: CalendarProviderProps) {
    const [date, setDate] = useState<Date>(defaultDate);

    const editDate = (d:Date) => {
        setDate(d)
    }

    return <CalendarContext.Provider value={{
        events,
        date,
        editDate,
    }}>
        {children}
    </CalendarContext.Provider>
}