import { motion } from "framer-motion";
import { forwardRef } from "react";

type EventsDayBoxProps = {
    onClose: () => void
}

const style: React.CSSProperties  = {
    position: 'fixed',
    top: "50%",
    left: "50%",
    transform: '!translateX(-50%)',
    width: 300,
    height: 300,
    backgroundColor: '#FFF',
    borderRadius: 20,
    zIndex: 1000,
    cursor: 'pointer',
  }

const EventsDayBox = forwardRef<HTMLInputElement, EventsDayBoxProps>(({onClose}, ref) => {
    return <div
      style={style}
      ref={ref}
    > big
        <button onClick={onClose} className="absolute right-3 top-3">close</button>
    </div>
});

const MotionEventsDayBox = motion(EventsDayBox);
MotionEventsDayBox.displayName = "MotionEventsDayBox";

export { MotionEventsDayBox }