import { Button } from "@/components/ui/button"
import { useCalendar } from "../useCalendar"
import moment from "moment"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function CalendarHeaderNav()
{
    const { date, goToNextMonth, goToPrevMonth } = useCalendar()
    return <nav className="c-header-nav">
        <Button className="nav-button" onClick={goToPrevMonth}>
            <ChevronLeft />
        </Button>
        <Button className="nav-button" onClick={goToNextMonth}>
            <ChevronRight />
        </Button>
        <div className="nav-month">
            {moment(date).format("MMMM yyy")}
        </div>
        
    </nav>
}