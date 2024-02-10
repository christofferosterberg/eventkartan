import React from "react"
import Event from "./Event"
import { EventType } from "./Event"

interface ListEventsProps {
    events: EventType[],
    onEventClick: (activeEvent: EventType) => void
}

function ListEvents({ events, onEventClick }: ListEventsProps) {

    return (
        <div style={{ maxHeight: '100vh', overflowY: 'auto' }}>
            <ul className='list-group'>
            {events.map((event, index) => (
                    <Event key={index} event={event} onEventClick={onEventClick} />
                ))}
            </ul>
        </div>
    )
}

export default ListEvents