import Search from './Search';
import ListEvents from './ListEvents';
import { useEffect, useState } from 'react';
import EventModal from './EventModal';
import { EventType } from './Event';


function Home() {
    const style = {
        backgroundColor: "#cfcfcf"
    };

    const [showModal, setShowModal] = useState(false);
    const [activeEvent, setActiveEvent] = useState<EventType | null>(null);

    const handleNewActiveEvent = (newActiveEvent: EventType) => {
        setActiveEvent(newActiveEvent);
    };

    const handleCloseModal = () => setShowModal(false);
    const handleSaveChanges = () => setShowModal(false);

    useEffect(() => {
        if (activeEvent) {
            setShowModal(true)
        }
    }, [activeEvent]);

    return (
        <div>
            <h1 className='text-center'>Välkommen till eventkartan!</h1>
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <Search></Search>
                        <ListEvents onEventClick={handleNewActiveEvent}></ListEvents>
                    </div>
                    <div className="col-lg" style={style}>
                        Här kommer det vara en karta
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
    )
}

export default Home