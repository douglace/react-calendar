import { motion } from "framer-motion";
import { forwardRef } from "react";
import { X } from "lucide-react";
import { EventForm } from "./event-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import moment from "moment";

type EventsFormBoxProps = {
    onClose: () => void,
    currenDate?: moment.Moment
} 

const style: React.CSSProperties  = {
    position:"relative",
    width: 500,
    height: 500,
    backgroundColor: '#FFF',
    borderRadius: 5,
    zIndex: 1002,
    cursor: 'pointer',
}

const EventsFormDayBox = forwardRef<HTMLInputElement, EventsFormBoxProps>(({onClose, currenDate}, ref) => {
    return <div className="fixed inset-0 z-[49] bg-black/50 flex items-center justify-center"
        onClick={onClose}
    >
        <div 
            style={style}
            ref={ref}
            className="shadow-lg  rounded-md border p-4 overflow-auto"
            onClick={(e) => e.stopPropagation()}
        >
            <ScrollArea className="h-full w-full py-2 px-3 ">
                <div className="pt-10">
                    <EventForm 
                        currenDate={currenDate}
                        onSubmitForm={() => onClose()}
                    />
                </div>
            </ScrollArea>
            <button onClick={onClose} className="absolute right-3 top-3 ">
                <X />
            </button>
        </div>
    </div>
});

const MotionEventsFormBox = motion(EventsFormDayBox);
MotionEventsFormBox.displayName = "MotionEventsFormBox";

export {
    MotionEventsFormBox
}