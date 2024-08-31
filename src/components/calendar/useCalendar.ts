"use client";

import { useContext } from "react";
import { CalendarContext } from "@/components/calendar/calendar-provider";
import EventManager from "@/components/calendar/classes/EventManager";
import CalendarEvent from "@/components/calendar/classes/CalendarEvent";
import CalendarObject from "@/components/calendar/classes/CalendarObject";

export function useCalendar() {
    const { events, date, editDate } = useContext(CalendarContext);
    const em = new EventManager(events);
    const c = new CalendarObject(date);
    const ce = new CalendarEvent(c, em)


    return { 
        date,
        c,
        setDate: editDate,
        goToNextMonth: () => editDate(c.nextMonth()),
        goToPrevMonth: () => editDate(c.prevMonth()),
        momentDate: c.momentDate(),
        days: c.getDays(),
        daysOfWeek: c.getDaysOfWeek(),
        firstDayOfWeek: c.firstDayOfWeek(),
        escapeDays: c.totalDayBeforeStartMonth(),
        eventsWeek: ce.getEventsWeek(),
        getEventsByDay: (day:moment.Moment) => ce.getEventsByDay(day)
     }
}
