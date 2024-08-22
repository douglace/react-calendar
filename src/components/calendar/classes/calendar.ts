import moment from 'moment';
import { CalendarEvent } from '../calendar-provider';

class CalendarObject {
    constructor(private date:Date, private events:CalendarEvent[]){}

    getDays(): moment.Moment[] {
        let days = [];
        let date = new Date(this.date.getFullYear(), this.date.getMonth(), 1);

        while (date.getMonth() === this.date.getMonth()) {
            days.push(moment(new Date(date)));
            date.setDate(date.getDate() + 1);
        }
        
        return days;
    }

    getDaysOfWeek() {
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    }

    firstDayOfWeek() {
        const firstDate = moment(new Date(this.date.getFullYear(), this.date.getMonth(), 1));
        return firstDate.day();
    }

    totalDayBeforeStartMonth()
    {
        const fdow = this.firstDayOfWeek();
        if (fdow == 0) return 6;
        return fdow - 1 ;
    }

    nextMonth() {
        return new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1);
    }

    prevMonth() {
        return new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1);
    }

    momentDate()
    {
        return moment(this.date)
    }

    getEventFromDay(day:number)
    {
        const events = this.events.filter((ev) => {
            const from = moment(ev.from);
            const to = moment(ev.to);
            const currentDay = moment(
                new Date(this.date.getFullYear(), this.date.getMonth(), day)
            );
            return currentDay >= from && currentDay <= to;
        });

        return events.length ? events : null
    }
}

export default CalendarObject;