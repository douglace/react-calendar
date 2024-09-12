import moment from 'moment';

type WeekNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type GroupWeekType = {
  [K in WeekNumber]?: number|string;
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

        if (fdom.day() != 1) {
            const lastMon = moment(this.firstDateOfMonth()).subtract(1, 'd');
            const nbdayOfLastMonth = lastMon.daysInMonth();
            const lastMonthDayStart = lastMon.daysInMonth() - (dayOfweek - 2);
            let firstDay = 1 as WeekNumber;
            for (let jour = lastMonthDayStart; jour <= nbdayOfLastMonth ; jour++) {
                currentWeek[firstDay] = -jour;
                firstDay++
            }
        }
        //debugger
        for (let jour = 1; jour <= nombreJours; jour++) {
            currentWeek[dayOfweek] = jour;

            if (dayOfweek === 7 || jour === nombreJours) {

                if (jour === nombreJours && dayOfweek !== 7) {
                    const missingDay = 7 - dayOfweek;
                    let nextDayOfWeek = dayOfweek % 7 + 1 as WeekNumber;
                    for(let j = 1; j <= missingDay; j++) {
                        currentWeek[nextDayOfWeek] = "+"+j;
                        nextDayOfWeek = nextDayOfWeek % 7 + 1;
                    }
                }

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

    nextMonth(day = 1) {
        return new Date(this.date.getFullYear(), this.date.getMonth() + 1, day);
    }

    prevMonth(day = 1) {
        return new Date(this.date.getFullYear(), this.date.getMonth() - 1, day);
    }

    momentDate()
    {
        return moment(this.date)
    }

    momentDateByDay(day:number) {
        const date =  moment(
            new Date(this.date.getFullYear(), this.date.getMonth(), day)
        );
        return date;
    }

    getGroupWeek():ParsedDayType[][] {
        let groupWeeks:ParsedDayType[][] = [];
        for(let i in this._daysByWeek) {
            const week = this._daysByWeek[i];
            let weekParsed:ParsedDayType[] = [];
            for(let weekDay of Object.keys(week)) {
                const weekDayParsed = parseInt(weekDay) as WeekNumber;
                const monthDay = week[weekDayParsed];
                let day = 0;
                let add = 0;
                if (typeof monthDay == "number") {
                    if (monthDay < 0) {
                        day = -monthDay;
                        add = -weekDayParsed;
                    } else {
                        day = monthDay;
                    }
                    
                } else {
                    day = parseInt(monthDay!);
                    add = weekDayParsed;
                }

                const gw:ParsedDayType = {
                    weekDay: weekDayParsed,
                    monthDay: day!,
                    day: add < 0 ? moment(this.prevMonth(day!)) : add > 0 ? moment(this.nextMonth(day!)) :this.momentDateByDay(day!)
                }
                weekParsed = [...weekParsed, ...[gw]]
            }
            groupWeeks = [...groupWeeks, ...[weekParsed]] ;
        }
        
        return groupWeeks
    }
}

export default CalendarObject;