import moment from 'moment';

type WeekNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type GroupWeekType = {
  [K in WeekNumber]?: number;
};

type ParsedDayType = {
    weekDay: number,
    monthDay: number,
    day: moment.Moment
}


class CalendarObject {
    _daysByWeek: GroupWeekType[] = [];
    pgw:ParsedDayType[][] = [];

    constructor(private date:Date){
        this._daysByWeek = this.splitDaysByWeek();
        this.pgw = this.getGroupWeek();
    }

    


    getDays(): moment.Moment[] {
        let days = [];
        let date = this.firstDateOfMonth();

        while (date.getMonth() === this.date.getMonth()) {
            days.push(moment(new Date(date)));
            date.setDate(date.getDate() + 1);
        }
        
        return days;
    }

    firstDateOfMonth() {
        return new Date(this.date.getFullYear(), this.date.getMonth(), 1)
    }

    splitDaysByWeek():GroupWeekType[] {
        const fdom = moment(this.firstDateOfMonth())
        
        
        const nombreJours = fdom.daysInMonth();
        const resultat:GroupWeekType[] = [];
        let currentWeek:GroupWeekType = {};
        let dayOfweek = (fdom.day() == 0 
            ? 7
            : fdom.day()
        ) as WeekNumber ;

        for (let jour = 1; jour <= nombreJours; jour++) {
            currentWeek[dayOfweek] = jour;

            if (dayOfweek === 7 || jour === nombreJours) {
                resultat.push(currentWeek);
                currentWeek = {};
            }

            dayOfweek = dayOfweek % 7 + 1;
        }
        
        return resultat;
    }

    getDaysOfWeek() {
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    }

    firstDayOfWeek() {
        const firstDate = moment(this.firstDateOfMonth());
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

    momentDateByDay(day:number) {
        return moment(
            new Date(this.date.getFullYear(), this.date.getMonth(), day)
        );
    }

    getGroupWeek():ParsedDayType[][] {
        let groupWeeks:ParsedDayType[][] = [];
        for(let i in this._daysByWeek) {
            const week = this._daysByWeek[i];
            let weekParsed:ParsedDayType[] = [];
            for(let weekDay of Object.keys(week)) {
                const weekDayParsed = parseInt(weekDay) as WeekNumber;
                const monthDay = week[weekDayParsed];

                const gw:ParsedDayType = {
                    weekDay: weekDayParsed,
                    monthDay: monthDay!,
                    day: this.momentDateByDay(monthDay!)
                }
                weekParsed = [...weekParsed, ...[gw]]
            }
            groupWeeks = [...groupWeeks, ...[weekParsed]] ;
        }
        return groupWeeks
    }
}

export default CalendarObject;