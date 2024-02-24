import React, { ChangeEvent, FormEvent, useState } from 'react'
import { CompanyType, company } from '../../Types/CompanyType'
import AddressInput from '../Misc/AddressInput';
import { createEvent } from '../../firestore';

interface CreateEventProps {
    company: CompanyType;
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

function CreateEvent({ company }: CreateEventProps) {
    const [formValues, setFormValues] = useState<FormValues>({
        address: company.address,
        book: '',
        date: null,
        host: company.orgNumber,
        longDescription: '',
        shortDescription: '',
        title: ''
    })
    const [date, setDate] = useState('');
    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault()
        createEvent(formValues)
    }
    function handleFormChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {

    }

    const handleDateChange = (event: any) => {
        setDate(event.target.value);
    };

    return (
        <div>
            <h2>Lägg upp event</h2>
            <form onSubmit={handleSubmit}>
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
                <button className="mt-2" type="submit">Publicera event</button>
            </form>
        </div>
    )
}

export default CreateEvent