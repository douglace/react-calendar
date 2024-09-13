import { motion } from "framer-motion";
import { forwardRef } from "react";
import { MoreHorizontal } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const style: React.CSSProperties = {
    backgroundColor: '#FFF',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
    cursor: 'pointer',
    zIndex: '900',
}

type MoreEventsProps = {
    triggerOpen: () => void,
    totalEvent?: number
}

const MoreEvents = forwardRef<HTMLInputElement, MoreEventsProps>(({triggerOpen, totalEvent}, ref) =>  {
    return <div
        ref={ref}
        style={style}
        className="more-event" 
        title="plus d'evenements"
        onClick={triggerOpen}
    >
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger className=""> 
                <MoreHorizontal size={10} />
            </TooltipTrigger>
            <TooltipContent>
                <p>+{totalEvent || 1} evenements</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
</div>
});

const MotionMoreEvents = motion(MoreEvents);
MotionMoreEvents.displayName = "MotionMoreEvents";

export {
    MotionMoreEvents
}