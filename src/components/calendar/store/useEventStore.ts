import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'
import { CalendarEvent } from "../calendar-provider"

type EventStoreState ={
    events: CalendarEvent[],
    init: (events: CalendarEvent[]) => void,
    addEvent: (event: CalendarEvent) => void,
    removeEvent: (eventId: string) => void,
    editEvent: (event: CalendarEvent) => void,
}

const useEventStore = create<EventStoreState>()(
    persist(
        (set) => ({
            events: [],
            init:(events: CalendarEvent[]) => set({events: events}),
            addEvent: (event: CalendarEvent) => set((state) => ({ events: [...state.events, event] })), // Ajout de la méthode addEvent
            removeEvent: (eventId: string) => set((state) => ({ events: state.events.filter(e => e.id !== eventId) })), // Ajout de la méthode removeEvent
            editEvent: (event: CalendarEvent) => set((state) => ({ // Ajout de la méthode editEvent
                events: state.events.map(e => e.id === event.id ? event : e)
            }))
        }),
        {
            name: "events-storage",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default useEventStore;