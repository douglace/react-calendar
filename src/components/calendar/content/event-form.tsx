import { forwardRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ColorPicker } from "@/components/ui/color-picker";
import { DatetimePicker } from "@/components/ui/date-time-picker";
import moment from "moment";
import { useCalenderContext } from "../calendar-provider";
import { motion } from "framer-motion";
import { EventFormatedType } from "../classes/EventManager";

const eventFormSchema = z.object({
    fullday: z.boolean(),
    type: z.enum(["day", "hour"]),
    from: z.date({
        message: "Date from must be a date", 
        required_error: "Date & time is required!.",
    }),
    to: z.date({
        message: "Date to must be a date"
    }),
    color: z.string({
        message: "Color must be a valid color"
    }),
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }).max(80, {
        message: "Title must be max 80 characters.",
    }),
    description: z.string().min(3, {
        message: "Title must be at least 10 characters.",
    }).max(500, {
        message: "Title must be max 500 characters.",
    }),
});


type EventFormType = {
    currenDate?: moment.Moment,
    onSubmitForm: () => void,
    event?: EventFormatedType
}

const EventForm = forwardRef<HTMLFormElement, EventFormType>(({event, currenDate, onSubmitForm}, ref) => {
    const { addEvent, setEvent } = useCalenderContext();

    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: {
          title: "",
          fullday: false,
          type:"day",
          description: "",
          color: "#EBa797",
          from: currenDate?.toDate() || new Date,
          to: (new Date((currenDate?.toDate() || new Date).setTime((currenDate?.toDate().getTime() || Date.now()) + (24 * 3600 * 60 * 40))))
        },
    });

    useEffect(() => {
        if (event) {
            form.reset({
                ...event,
                from: event.from.toDate(),
                to: event.to.toDate(),
            });
            console.log('reset')
        }
    }, [event]);

    function onSubmit(values: z.infer<typeof eventFormSchema>) {
        let {from, to} = values;

        // if (values.fullday) {

        // }
        
        const newEvent = {
            ...values,
            from: moment(from),
            to: moment(to)
        }
        if (event?.id) {
            setEvent({ event: {...newEvent, id: event.id} });
        } else {
            addEvent({ event: {...newEvent, id: Date.now().toString()} });
        }

        
        
        onSubmitForm()
    }



    return <Form {...form}>
        <form ref={ref} onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormDescription>
                Title of event
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about your event"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Description de l'évènement
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of event</FormLabel>
              <FormControl>
                <Select {...field} onValueChange={(value) => {
                    form.setValue('type', value as "day"|"hour", {
                        shouldDirty: true,
                        shouldValidate: true
                    });
                    if (value == "hour") {
                        form.setValue('to', form.watch().from, {
                            shouldDirty: true,
                            shouldValidate: true
                        });
                        // form.setValue('fullday', true, {
                        //     shouldDirty: true,
                        //     shouldValidate: true
                        // });
                    } else {
                        form.setValue('fullday', false, {
                            shouldDirty: true,
                            shouldValidate: true
                        });
                    }
                }}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select type of event" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="day">Jour</SelectItem>
                        <SelectItem value="hour">Heure</SelectItem>
                    </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {
            form.watch().type == "hour"
            ? <div className="flex items-center space-x-2">
            <Checkbox 
                id="fullday"
                checked={form.watch().fullday} 
                onCheckedChange={(checked)=> {
                    form.setValue('fullday', checked == true, {
                        shouldDirty: true,
                        shouldValidate: true
                    });
                    
                }}
            />
            <label
                htmlFor="fullday"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                All day ?
            </label>
        </div> : null
        }

        

        <DatetimePicker
            seletedDate={form.watch().from}
            onChange={(date) => {
                form.setValue('from', date, {
                    shouldDirty: true,
                    shouldValidate: true
                });
            }}
            displayMinute={form.watch().type == "hour" && !form.watch().fullday}
            label="Start date"
        />
        {
            !form.watch().fullday
            ? <DatetimePicker 
                seletedDate={form.watch().to}
                onChange={(date) => {
                    form.setValue('to', date, {
                        shouldDirty: true,
                        shouldValidate: true
                    });
                }}
                displayMinute={form.watch().type == "hour" && !form.watch().fullday}
                label="End date"
                hideCalendar={form.watch().type == "hour"}
            /> : null
        }
        
            

        <ColorPicker
            label="Select color"
            value={form.watch().color}
            onChangeColor={(color) => {
                form.setValue('color', color, {
                    shouldDirty: true
                });
            }}
        />

        <Button type="submit" className="bg-foreground text-background shadow-lg">Submit</Button>
        </form>
    </Form>
});



const MotionEventForm = motion(EventForm)
EventForm.displayName = "EventForm";
MotionEventForm.displayName = "MotionEventForm"
export {
    EventForm,
    MotionEventForm
}