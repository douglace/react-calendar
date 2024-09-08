import CalendarObject from "@/components/calendar/classes/CalendarObject";
import EventManager, { EventFormatedType } from "@/components/calendar/classes/EventManager";
import moment from 'moment';

export type EventWeekType = {
    from: moment.Moment,
    to: moment.Moment,
    duration: number,
    event: EventFormatedType,
    position: number
}

type RecordEventWeek = Record<string, EventWeekType>;

type TakenPositionType = {
    from: moment.Moment,
    to: moment.Moment,
    event: EventFormatedType,
    position: number
}

class CalendarEvent {
    private takenPosition:TakenPositionType[] = [];
    private eventsWeek:RecordEventWeek[] = [];
    constructor(private calendar:CalendarObject, private em:EventManager) {
        this.generatedEventByWeek();
    }

    generatedEventByWeek()
    {
        for(let week of this.calendar.pgw) {
            const firstDayOfWeek = week[0].day;
            const lastDayOfWeek = week[week.length -1].day;
            const eventWeek = this.sortEventFromDate({
                from: moment(firstDayOfWeek.format("YYYY-MM-DD")),
                to: moment(lastDayOfWeek.format("YYYY-MM-DD"))
            });
            this.eventsWeek.push(eventWeek)
        }
    }

    sortEventFromDate({from, to}:{from:moment.Moment, to:moment.Moment}): RecordEventWeek 
    {
        
        let eventData: RecordEventWeek = {};
 
        // - parcourrir la liste des jours entre ces deux date
        // - Pour chaque date récupéré l'évent qui commence ce jour
        while(from <= to) {
            const today = moment(from.format("YYYY-MM-DD"), "YYYY-MM-DD")
 
            for(let event of this.em.events) {
                if (
                     from >= event.from && from <= event.to &&
                     (typeof eventData[event.id] == 'undefined')
                ) {
                     const endEventWeek = event.to > to ? to : event.to;
                     
                    if (endEventWeek < from) {
                        continue;
                    }
                    const position = this.getPositionByDay(today);
                    this.takenPosition.push({
                        from: today,
                        to: endEventWeek,
                        event:event,
                        position: position
                    });
                    if (event.id == "8") {
                        //console.log(event, position, today.format("YYYY MM DD"));
                    }
                    eventData[event.id] = {
                        from: today,
                        to: endEventWeek,
                        duration: endEventWeek.diff(from, 'days') + 1,
                        event:event,
                        position: position
                    }
                }
            }
            from.add(1, "days");
        }
        return eventData;
        
    }

    getEventsWeek():RecordEventWeek[] {
        return this.eventsWeek
    }

    private getPositionByDay(day:moment.Moment): number {
        if(this.takenPosition.length == 0) return 1;
        // compte tous les jours dont la date de début et de fin
        // sont comprisent entre la date du jour.

        let position = 0;
        let takenPositionDays = [];
        for(let pos of this.takenPosition) {
            if (pos.from <= day && pos.to >= day) {
                //position++;
                takenPositionDays.push(pos.position)
            }
        }

        takenPositionDays = takenPositionDays.sort((a, b) => a - b);
        const maxPosition = takenPositionDays.length
            ? Math.max(...takenPositionDays)
            : 1
        ;

        for(let i = 1; i <= Math.max(...takenPositionDays); i++) {
            if (!takenPositionDays.includes(i)) {
                position =  i;
                break;
            }
        }
        
        if (position == 0) {
            position = maxPosition + 1;
        } 
        
        

        return position;
    }

    getEventsByDay(day:moment.Moment) {
        let events:EventWeekType[] = [];
        for (const week of this.getEventsWeek()) {
            for(const event of Object.values(week)) {
                if (event.from.format('YYYY-MM-DD') == day.format('YYYY-MM-DD')) {
                    events = [...events, event];
                }
            }
        };
        return events;
    }

}

export default CalendarEvent