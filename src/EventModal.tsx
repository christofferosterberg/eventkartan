import { Button, Modal } from 'react-bootstrap'
import { EventType } from './Event';

export interface EventModalProps {
    showModal: boolean
    activeEvent: EventType
    handleCloseModal: () => void
    handleSaveChanges: () => void
}

function EventModal({ showModal, activeEvent, handleCloseModal, handleSaveChanges }: EventModalProps) {
    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>{activeEvent.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img className="card-img-top mx-auto d-block" src="./pub-exempel.jpg" alt="Card image cap"></img>
                <div className="card-body pt-2 pl-2 pr-2 pb-0">
                    <h5 className="card-title mb-2">{activeEvent.title}</h5>
                    <p className="card-text mb-2">{activeEvent.time}</p>
                    <p className="card-text mb-2">{activeEvent.place}</p>
                    <p className="card-text mb-2">{activeEvent.shortDescription}</p>
                    <p className="card-text mb-2">
                        Bokning:
                        {String(activeEvent.book) !== "" ? (
                            <span>
                                {" "}
                                {/* Add a space before the anchor element */}
                                <a href={String(activeEvent.book)}>{activeEvent.book}</a>
                            </span>
                        ) : (
                            " Ingen bokning krävs."
                        )}
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Stäng
                </Button>
                {/* <Button variant="primary" onClick={handleSaveChanges}>
                    Spara
                </Button> */}
            </Modal.Footer>
        </Modal>
    )
}

export default EventModal