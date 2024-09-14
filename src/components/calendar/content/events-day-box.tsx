import { motion } from "framer-motion";
import { PencilIcon, TrashIcon, X } from "lucide-react";
import moment from "moment";
import { forwardRef, useMemo } from "react";
import { useCalendar } from "../useCalendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCalenderContext } from "../calendar-provider";

type EventsDayBoxProps = {
    onClose: () => void,
    day: moment.Moment
}

const style: React.CSSProperties  = {
    position:"relative",
    width: 700,
    height: 500,
    backgroundColor: '#FFF',
    borderRadius: 5,
    zIndex: 1002,
    cursor: 'pointer',
}

const EventsDayBox = forwardRef<HTMLInputElement, EventsDayBoxProps>(({onClose, day}, ref) => {

    const {getEventsByDay} = useCalendar();
    const { deleteEvent } = useCalenderContext();
    const events = useMemo(() => getEventsByDay(day), [day]);

    return <div className="fixed inset-0 z-[49] bg-black/50 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                style={style}
                ref={ref}
                className="shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >   <div className="list-events p-5 w-full h-full pt-10">
                <h1 className="font-semibold border-b mb-4 text-lg">Ma liste d'évènement de la journée</h1>
                <ScrollArea className="h-[400px]">
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Evenements
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    events.map(e => <tr key={e.event.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-2 ">
                                            <span
                                                className="w-2 h-2 block rounded-full"
                                                style={{
                                                    backgroundColor: e.event.color
                                                }}
                                            >

                                            </span>
                                            {e.event.title.substring(0, 40)}
                                        </th>
                                        <td className="px-6 py-4 ">
                                            <div className="flex gap-1 justify-center items-center">
                                                <span className="text-xs text-black font-bold">
                                                    {e.event.from.calendar()}
                                                </span>
                                                - 
                                                <span className="text-xs text-black font-bold">
                                                    {e.event.to.calendar()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-1">
                                                <motion.button 
                                                    className="shadow-md border p-1 rounded-sm text-cyan-500" 
                                                    whileHover={{
                                                        scale: 1.15,
                                                        backgroundColor: "#06b6d4",
                                                        color: "#fff"
                                                    }}
                                                ><PencilIcon size={10} /></motion.button>
                                                <motion.button 
                                                    className="shadow-md border p-1 rounded-sm text-red-500"
                                                    whileHover={{
                                                        scale: 1.15,
                                                        backgroundColor: "#ef4444",
                                                        color: "#fff"
                                                    }}
                                                    onClick={() => deleteEvent({eventId: e.event.id})}
                                                ><TrashIcon size={10} /></motion.button>
                                            </div>
                                        </td>
                                    </tr>)
                                }
                                
                            </tbody>
                        </table>
                    </div>
                </ScrollArea>
            </div>
            <button onClick={onClose} className="absolute right-3 top-3">
                <X />
            </button>
        </div>
    </div>
});

const MotionEventsDayBox = motion(EventsDayBox);
MotionEventsDayBox.displayName = "MotionEventsDayBox";

export { MotionEventsDayBox }