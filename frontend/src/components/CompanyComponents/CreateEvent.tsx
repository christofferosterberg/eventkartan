import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { CompanyType, company } from '../../Types/CompanyType'
import AddressInput, { formatAddressField } from '../Misc/AddressInput';
import { createEvent } from '../../firestore';
import { PlaceType } from '../Misc/PlaceType';

interface CreateEventProps {
    company: CompanyType;
}

interface FormValues {
    address: string;
    book: string,
    date: string,
    host: string,
    // img: string,
    latitude: number,
    longitude: number
    longDescription: string;
    shortDescription: string;
    title: string
}

function CreateEvent({ company }: CreateEventProps) {
    const [formValues, setFormValues] = useState<FormValues>({
        address: formatAddressField(company.visitAddress, company.visitCity, company.visitCountry),
        book: '',
        date: '',
        host: company.orgNumber,
        longDescription: '',
        shortDescription: '',
        title: '',
        latitude: company.visitLatitude,
        longitude: company.visitLongitude
    })
    const [place, setPlace] = useState<PlaceType>({
        address: company.visitAddress,
        city: company.visitCity,
        country: company.visitCountry,
        zip: company.visitZip,
        latitude: company.visitLatitude,
        longitude: company.visitLongitude
    })

    const [date, setDate] = useState('');
    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault()
        // console.log(formValues)
        createEvent(formValues)
    }
    function handleFormChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setFormValues(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value, // Using computed property names
        }));
    }

    const handleDateChange = (event: any) => {
        setDate(event.target.value);
    };

    useEffect(() => {
        if (place) {
            setFormValues(prevState => ({
                ...prevState,
                ['address']: place.address,
                ['latitude']: place.latitude,
                ['longitude']: place.longitude,
            }));
        }
    }, [place])

    useEffect(() => {
        if (date) {
            // console.log(date)
            setFormValues(prevState => ({
                ...prevState,
                ['date']: date
            }));
        }
    }, [date])

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
                        <AddressInput
                            label="Besöksadress"
                            name="address"
                            value={formValues.address}
                            setPlace={setPlace}
                            setZip={undefined}
                        />
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
                        <label htmlFor="dateInput">Välj datum och tid:</label>
                        <input
                            className='mx-2'
                            type="datetime-local"
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