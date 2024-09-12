"use client";

import { useContext, useMemo } from "react";
import { CalendarContext } from "@/components/calendar/calendar-provider";
import EventManager from "@/components/calendar/classes/EventManager";
import CalendarEvent from "@/components/calendar/classes/CalendarEvent";
import CalendarObject from "@/components/calendar/classes/CalendarObject";
import moment from "moment";

export function useCalendar() {
    const { events, date, editDate } = useContext(CalendarContext);

    const em = useMemo(() => new EventManager(events), [events]);
    const c = useMemo(() => new CalendarObject(date), [date]);
    const ce = useMemo(() => new CalendarEvent(c, em), [c, em]);


    return useMemo(() => ({ 
        date,
        c,
        setDate: editDate,
        goToNextMonth: () => editDate(c.nextMonth()),
        goToPrevMonth: () => editDate(c.prevMonth()),
        isNextMonth: (d:moment.Moment) => d.month() == (moment(c.nextMonth())).month(),
        isPrevMonth: (d:moment.Moment) => d.month() == (moment(c.prevMonth())).month(),
        momentDate: c.momentDate(),
        days: c.getDays(),
        groupWeek: c.getGroupWeek(),
        daysOfWeek: c.getDaysOfWeek(),
        firstDayOfWeek: c.firstDayOfWeek(),
        escapeDays: c.totalDayBeforeStartMonth(),
        eventsWeek: ce.getEventsWeek(),
        getEventsByDay: (day:moment.Moment) => ce.getEventsByDay(day),
        getEventsByType: (day:moment.Moment) => ce.getEventByTypeByDay(day),
    }), [date, c, em, ce]);
}
