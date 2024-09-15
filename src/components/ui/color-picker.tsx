import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { forwardRef, useState } from "react";
import { ColorPicker as PaletteColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

import { motion } from "framer-motion"
import { Button } from "./button";
import { Label } from "./label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    value?: string,
    onChangeColor?: (value: string) => void
  }

const ColorPicker = forwardRef<HTMLInputElement, InputProps>((
    { className, value, label, onChangeColor, type, ...props }, ref) => {
    const [color, setColor] = useColor(value ? value :"#E7E7E7");
    const [open, setOpen] = useState(false);
    // const [scope, animate] = useAnimate();

    const handleToogle = () => {
        // if (open) {
        //     animate('.chevron-toggle', {rotate: "0deg"});
        // } else {
        //     animate('.chevron-toggle', {rotate: "180deg"});
        // }
        setOpen(!open)
    }

    return <motion.div className={cn(className)} >
        <Label onClick={() => setOpen(true)} className="block mb-3"> {label ? label : "Pick color"} </Label>
        <input 
            ref={ref} 
            type="hidden" 
            {...props}
            value={color.hex}
            onChange={(e) => onChangeColor ? onChangeColor(e.target.value) : props.onChange ? props.onChange(e) : null}
        />
        <div  className="flex justify-between items-center gap-2 rounded-sm mb-2">
            <div className="w-full">
                
                <AnimatePresence>
                    {
                        open
                        ? <motion.div  className="w-full flex flex-col gap-2 items-center">
                            <div className="w-full">
                                <PaletteColorPicker  
                                    hideInput={["rgb", "hsv"]} 
                                    color={color} 
                                    onChange={(c) => {
                                        setColor(c)
                                        if(onChangeColor) {
                                            onChangeColor(c.hex)
                                        }
                                    }} 
                                />
                            </div>
                            <Button 
                                variant={"secondary"} 
                                type="button" 
                                onClick={handleToogle}
                                style={{
                                    backgroundColor: color.hex
                                }}
                            >
                                Validate color
                            </Button>
                        </motion.div>
                        : <motion.div 
                            className="h-8 rounded-sm"
                            style={{
                                backgroundColor: color.hex
                            }}
                            onClick={handleToogle}
                            
                        ></motion.div>
                    }
                </AnimatePresence>
            </div>
            {/* <button 
                type="button" 
                style={{
                    backgroundColor: color.hex
                }} 
                className="px-3 rounded-r-sm h-8 w-8"
                onClick={handleToogle}
            >
                <ChevronDown className="chevron-toggle" size={16} />
            </button> */}
        </div>

        
    </motion.div>;
});

ColorPicker.displayName = "ColorPicker";

export {
    ColorPicker
}