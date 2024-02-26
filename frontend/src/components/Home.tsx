import Search from './Search';
import ListEvents from './ListEvents';
import { useEffect, useState } from 'react';
import EventModal from './EventModal';
import { EventType } from '../Types/EventType';
import { fetchEvents } from '../firestore';
import HomeMap from './HomeMap';

// const fetchedEvents: EventType[] = [
//     {
//         id: 1,
//         title: "Musikquiz på Hops",
//         date: "Tid: 19:00, onsdag 24:e januari",
//         address: "Plats: Hops, Andra Långgatan",
//         shortDescription: "Välkommen till ett roligt event!",
//         longDescription: "hej",
//         book: "https://www.hopsbar.se",
//         // img: "./pub-exempel.jpg",
//         latitude: 57.69896239999999,
//         longitude: 11.9476028,
//         host: "111"
//         // position: {
//         //     lat: 57.698558,
//         //     lng: 11.9436
//         // }
//     },
    // Add more events here
    // {
    //     title: "VM-visning på Olearys",
    //     time: "Tid: 19:00, onsdag 24:e januari",
    //     place: "Plats: Hops, Andra Långgatan",
    //     shortDescription: "Välkommen till ett roligt event på Olearys",
    //     book: "",
    //     img: "./pub-exempel.jpg",
    //     position: {
    //         lat: 57.70716,
    //         lng: 11.96679
    //     }
    // },
    // {
    //     title: "Livemusik på Viva",
    //     time: "Tid: 19:00, onsdag 24:e januari",
    //     place: "Plats: Hops, Andra Långgatan",
    //     shortDescription: "Välkommen till ett roligt event på Viva!",
    //     book: "",
    //     img: "./pub-exempel.jpg",
    //     position: {
    //         lat: 57.700192,
    //         lng: 11.968429
    //     }
    // },
    // {
    //     title: "Vinprovning på Rubinen",
    //     time: "Tid: 19:00, onsdag 24:e januari",
    //     place: "Plats: Hops, Andra Långgatan",
    //     shortDescription: "Välkommen till ett roligt event på Rubinen!",
    //     book: "",
    //     img: "./pub-exempel.jpg",
    //     position: {
    //         lat: 57.6997975,
    //         lng: 11.9762968
    //     }
    // },
    // {
    //     title: "Allmänquiz på Bryggeriet",
    //     time: "Tid: 19:00, onsdag 24:e januari",
    //     place: "Plats: Hops, Andra Långgatan",
    //     shortDescription: "Välkommen till ett roligt event på Hops!",
    //     book: "",
    //     img: "./pub-exempel.jpg",
    //     position: {
    //         lat: 57.7013562,
    //         lng: 11.9730546
    //     }
    // }
// ];

// const displayedEvents: EventType[] = events

function Home() {

    const [showModal, setShowModal] = useState(false);
    const [activeEvent, setActiveEvent] = useState<EventType | null>(null);
    const [isLoading, setIsLoading] = useState(true)
    const [events, setEvents] = useState<EventType[] | null>(null)

    const handleNewActiveEvent = (newActiveEvent: EventType) => {
        setActiveEvent(newActiveEvent);
        setShowModal(true)
    };

    const handleCloseModal = () => setShowModal(false);
    const handleSaveChanges = () => setShowModal(false);

    useEffect(() => {
        if (!events) {
            fetchEvents().then((fetchedEvents) => {
                console.log(fetchedEvents)
                setEvents(fetchedEvents)
                setIsLoading(false)

            })
        }
    }, [])


    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <div>
            {events ? (
                <div>
                    <h1 className='text-center'>Välkommen till Ute-Livet!</h1>
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                                <Search></Search>
                                <ListEvents events={events} onEventClick={handleNewActiveEvent}></ListEvents>
                            </div>
                            <div className="col-8">
                                <HomeMap events={events}></HomeMap>
                            </div>
                        </div>
                    </div>
                    {activeEvent && (
                        <EventModal
                            showModal={showModal}
                            activeEvent={activeEvent}
                            handleCloseModal={handleCloseModal}
                            handleSaveChanges={handleSaveChanges}>
                        </EventModal>
                    )}
                </div>
            ) : (
                null
            )}
        </div>
    )
}

export default Home