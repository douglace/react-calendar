import { CalendarContextProvider } from "./calendar-provider";
import CalendarContent from "./content/calendar-content";
import "./calendar.css"
import CalendarHeaderDay from "./content/calendar-header-day";
import CalendarHeaderNav from "./content/calendar-header-nav";

export default function Canlendar()
{
    return (<CalendarContextProvider>
        <div className="calendar-wrapper">
            <CalendarHeaderNav />
            <CalendarHeaderDay />
            <CalendarContent />
        </div>
    </CalendarContextProvider>)
}