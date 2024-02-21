import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import AddressInput from '../Misc/AddressInput'
import { CompanyType } from '../../Types/CompanyType'
import { createEvent } from '../../firestore'

interface CreateEventModalProps {
    company: CompanyType
    showModal: boolean
    handleCloseModal: () => void
    handleSaveChanges: () => void
}

interface FormValues {
    address: string;
    book: string,
    date: Date | null,
    host: string,
    // img: string,
    // latitude: number,
    // longitude: number
    longDescription: string;
    shortDescription: string;
    title: string
}

function CreateEventModal({ company, showModal, handleCloseModal, handleSaveChanges }: CreateEventModalProps) {
    const [formValues, setFormValues] = useState<FormValues>({
        address: company.address,
        book: '',
        date: null,
        host: company.orgNumber,
        longDescription: '',
        shortDescription: '',
        title: ''
    })
    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault()
        createEvent(formValues)
    }
    const [date, setDate] = useState('');

    function handleFormChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {

    }

    const handleDateChange = (event: any) => {
        setDate(event.target.value);
    };
    

    

    return (
        <Modal size="lg" show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Skapa event</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body>
                    <div className='row'>
                        <div className="form-floating mt-2 col-12">
                            <input
                                type="text"
                                name="title"
                                // value={formValues.email}
                                onChange={handleFormChange}
                                required
                                className="form-control"
                                placeholder=''>
                            </input>
                            <label className="col-form-label mx-2">Eventets titel</label>
                        </div>
                        <div className="mt-2 col-12">
                            <textarea
                                name="shortDescription"
                                rows={3}
                                // value={formValues.password}
                                onChange={handleFormChange}
                                required
                                className="form-control"
                                placeholder="Kort beskrivning"></textarea>
                            {/* <label className="col-form-label">Kort beskrivning</label> */}
                        </div>
                        <div className="mt-2 col-12">
                            <textarea
                                name="longDescription"
                                rows={5}
                                // value={formValues.password}
                                onChange={handleFormChange}
                                required
                                className="form-control"
                                placeholder="Fullständig beskrivning"></textarea>
                        </div>
                        <div className="mt-2 col-6">
                            <AddressInput handleFormChange={handleFormChange} address={company.address}></AddressInput>
                            {/* <label className="col-form-label mx-2">Adress</label> */}
                        </div>
                        <div className="form-floating mt-2 col-6">
                            <input
                                type="text"
                                name="book"
                                // value={formValues.email}
                                onChange={handleFormChange}
                                required
                                className="form-control"
                                placeholder=''>
                            </input>
                            <label className="col-form-label mx-2">Bokningslänk</label>
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="dateInput">Välj ett datum:</label>
                            <input
                                className='mx-2'
                                type="date"
                                id="dateInput"
                                value={date}
                                onChange={handleDateChange}
                            />
                        </div>
                    </div>

                </Modal.Body>

                <Modal.Footer>
                    <button className="" type="submit">Skapa</button>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Stäng
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default CreateEventModal