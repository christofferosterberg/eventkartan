
export interface EventType {
    title: String,
    time: String,
    place: String,
    shortDescription: String,
    book: String,
    img: string
}

interface EventProps {
    event: EventType,
    onEventClick: (activeEvent: EventType) => void
}

function Event(props: EventProps) {

    function handleClick() {
        props.onEventClick(props.event)
    }
    return (
        <li className='list-group-item'>
            <div className="p-2">
                <div className="d-flex p-2">
                    <img className="w-50" src={props.event.img} alt="Bild"></img>
                    <div className="p-2 flex-grow-1">
                        <h5 className="text-start mb-2">{props.event.title}</h5>
                        <p className="text-start mb-2">{props.event.time}</p>
                        <p className="text-start mb-2">{props.event.place}</p>
                        <p className="text-start mb-2">{props.event.shortDescription}</p>
                        <button className="align-start btn btn-primary" onClick={handleClick} >Se mer</button>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default Event
