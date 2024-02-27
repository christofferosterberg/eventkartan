import Search from './Search';
import ListEvents from './ListEvents';
import { useEffect, useState } from 'react';
import EventModal from './EventModal';
import { EventType } from '../Types/EventType';
import { fetchEvents } from '../firestore';
import HomeMap from './HomeMap';

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
                // console.log(fetchedEvents)
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
                                <HomeMap events={events} onEventClick={handleNewActiveEvent}></HomeMap>
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