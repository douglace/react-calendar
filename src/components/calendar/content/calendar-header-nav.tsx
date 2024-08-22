import { Button } from "@/components/ui/button"
import { useCalendar } from "../useCalendar"
import { CalendarPicker } from "./calendar-picker"

export default function CalendarHeaderNav()
{
    const { date, goToNextMonth, goToPrevMonth } = useCalendar()
    return <nav className="c-header-nav">
        <Button onClick={goToPrevMonth}>Prev</Button>
        
        <div>
            <CalendarPicker date={date}/>
        </div>
        
        <Button onClick={goToNextMonth}>Next</Button>
    </nav>
}