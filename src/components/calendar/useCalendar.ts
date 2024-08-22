"use client";

import { useContext } from "react";
import { CalendarContext } from "./calendar-provider";
import CalendarObject from "@/components/calendar/classes/calendar"

export function useCalendar() {
    const { events, date, editDate } = useContext(CalendarContext);
    const c = new CalendarObject(date, events);

    return { 
        date,
        c,
        getEventFromDay: (day:number) => c.getEventFromDay(day),
        setDate: editDate,
        goToNextMonth: () => editDate(c.nextMonth()),
        goToPrevMonth: () => editDate(c.prevMonth()),
        momentDate: c.momentDate(),
        days: c.getDays(),
        daysOfWeek: c.getDaysOfWeek(),
        firstDayOfWeek: c.firstDayOfWeek(),
        escapeDays: c.totalDayBeforeStartMonth(),
     }
}
