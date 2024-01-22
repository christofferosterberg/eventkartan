import Event from "./Event"
import { EventType } from "./Event"

interface ListEventsProps {
    onEventClick: (activeEvent: EventType) => void
}

function ListEvents({ onEventClick }: ListEventsProps) {
    const  event1: EventType = {
        title: "Musikquiz på Hops",
        time: "Tid: 19:00, onsdag 24:e januari",
        place: "Plats: Hops, Andra Långgatan",
        shortDescription: "Välkommen till ett roligt event!",
        book: "https://www.hopsbar.se",
        img: "./pub-exempel.jpg"
    }

    const  event2: EventType = {
        title: "VM-visning på Olearys",
        time: "Tid: 19:00, onsdag 24:e januari",
        place: "Plats: Hops, Andra Långgatan",
        shortDescription: "Välkommen till ett roligt event",
        book: "",
        img: "./pub-exempel.jpg"
    }

    const  event3: EventType = {
        title: "Livemusik på Viva",
        time: "Tid: 19:00, onsdag 24:e januari",
        place: "Plats: Hops, Andra Långgatan",
        shortDescription: "Välkommen till ett roligt event på Hops!",
        book: "",
        img: "./pub-exempel.jpg"
    }

    const  event4: EventType = {
        title: "Vinprovning på Vinigt",
        time: "Tid: 19:00, onsdag 24:e januari",
        place: "Plats: Hops, Andra Långgatan",
        shortDescription: "Välkommen till ett roligt event på Hops!",
        book: "",
        img: "./pub-exempel.jpg"
    }

    const  event5: EventType = {
        title: "Allmänquiz på Bryggeriet",
        time: "Tid: 19:00, onsdag 24:e januari",
        place: "Plats: Hops, Andra Långgatan",
        shortDescription: "Välkommen till ett roligt event på Hops!",
        book: "",
        img: "./pub-exempel.jpg"
    }

    return (
        <div style={{ maxHeight: '100vh', overflowY: 'auto' }}>
            <ul className='list-group'>
                <Event event={event1} onEventClick={onEventClick} />
                <Event event={event2} onEventClick={onEventClick} />
                <Event event={event3} onEventClick={onEventClick} />
                <Event event={event4} onEventClick={onEventClick} />
                <Event event={event5} onEventClick={onEventClick} />
            </ul>
        </div>
    )
}

export default ListEvents