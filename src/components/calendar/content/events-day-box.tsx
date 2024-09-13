import { motion } from "framer-motion";
import { X } from "lucide-react";
import { forwardRef } from "react";

type EventsDayBoxProps = {
    onClose: () => void
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

const EventsDayBox = forwardRef<HTMLInputElement, EventsDayBoxProps>(({onClose}, ref) => {
    return <div className="fixed inset-0 z-[1001] bg-black/50 flex items-center justify-center"><div
      style={style}
      ref={ref}
      className="shadow-lg"
    >   <div className="list-events p-5 w-full h-full">
            <h1>Ma liste d'évènement de la journée</h1>
        </div>
        <button onClick={onClose} className="absolute right-3 top-3">
            <X />
        </button>
    </div></div>
});

const MotionEventsDayBox = motion(EventsDayBox);
MotionEventsDayBox.displayName = "MotionEventsDayBox";

export { MotionEventsDayBox }