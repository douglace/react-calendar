"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { ScrollArea } from "./scroll-area";
import moment from "moment"
import { Label } from "./label"

type DatetimePickerProps = {
    seletedDate?: Date,
    onChange: (date: Date) => void
    displayMinute?: boolean
    label?: string
    hideCalendar?: boolean
}


export function DatetimePicker({seletedDate, onChange, displayMinute, label, hideCalendar}:DatetimePickerProps) {
  const [date, setDate] = React.useState<Date>()
  const [time, setTime] = React.useState<string>("05:00");

  React.useEffect(() => {
    if (seletedDate) {
        setDate(new Date(seletedDate.getTime()))
        const momentDate = moment(seletedDate)
        setTime(
            momentDate.format("HH:mm")
        );

    }
  }, [seletedDate]);

  const handleChange = (newDate?:Date) => {
        const [hours, minutes] = time?.split(":")!;
        newDate?.setHours(
            parseInt(hours),
            parseInt(minutes)
        );
        setDate(newDate!);
        onChange(newDate!);
  }

  const handleChangeTime = (e:string) => {
    setTime(e);
    if (date) {
        const [hours, minutes] = e.split(":");
        const newDate = new Date(date.getTime());
        newDate.setHours(parseInt(hours), parseInt(minutes));
        setDate(newDate);
        onChange(newDate!);
    }
  }

  const DisplayDate = () => {
    if (!date) return <span>Pick a date</span>;
    let formatedDate = format(date, "dd, MMMM yyy")
    if (displayMinute) {
        formatedDate += " " + format(date, "HH:mm")
    }

    return formatedDate
  }

  return (
    <div className="flex flex-col gap-5">
        <Label className="font-bold">{label || "Select date"}</Label>
        <Popover>
            <PopoverTrigger asChild>
                <Button
                variant={"outline"}
                className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                )}
                >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {<DisplayDate />}
                </Button>
            </PopoverTrigger>
            <PopoverContent 
                className="w-auto p-0 flex items-start"
                align="start"
            >
                {!hideCalendar ? 
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleChange}
                        initialFocus
                        fromYear={2000}
                        toYear={new Date().getFullYear()}
                        // disabled={(date) =>
                        //     Number(date) < Date.now() - 1000 * 60 * 60 * 24 ||
                        //     Number(date) > Date.now() + 1000 * 60 * 60 * 24 * 30
                        // }
                    /> : null
                }
                {
                    displayMinute
                    ? <div className="p-2 mt-2">
                    <p className=" font-normal focus:ring-0 w-[80px] text-center mb-2 px-2 py-1 border text-sm rounded-sm">{time}</p>
                    <ScrollArea className="h-[15rem] mt-2">
                        {Array.from({ length: 96 }).map((_, i) => {
                            const hour = Math.floor(i / 4)
                            .toString()
                            .padStart(2, "0");
                            const minute = ((i % 4) * 15)
                            .toString()
                            .padStart(2, "0");
                            return (
                            <p key={i} data-value={`${hour}:${minute}`}
                                className="px-2 py-1 text-sm cursor-pointer flex justify-center rounded-sm"
                                onClick={() => handleChangeTime(`${hour}:${minute}`)}
                                style={{
                                    backgroundColor: time == `${hour}:${minute}` ? "#E7E7E7" : "transparent"
                                }}
                            >
                                {hour}:{minute}
                            </p>
                            );
                        })}
                    </ScrollArea>    
                </div>  : null
                }
                
            </PopoverContent>
        </Popover>
    </div>
  )
}
