import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { getFunctions, httpsCallable } from "firebase/functions";
import { addAdmin } from '../../firestore';

export interface NewCompanyAdminModalProps {
    companyID: string,
    showModal: boolean
    handleCloseModal: () => void
    handleSaveChanges: () => void
}
interface FormValues {
    email: string,
    password: string,
    passwordValidate: string
}


function NewCompanyAdminModal({ companyID, showModal, handleCloseModal, handleSaveChanges }: NewCompanyAdminModalProps) {
    const functions = getFunctions();
    const createAdminUser = httpsCallable(functions, 'createAdminUser');

    const [formValues, setFormValues] = useState<FormValues>({
        email: '',
        password: '',
        passwordValidate: ''
    })

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(functions)
        console.log(formValues)
        createAdminUser({ email: formValues.email, password: formValues.password })
            .then((result) => {
                // Read result of the Cloud Function.
                console.log(result); // Newly created user's UID
                const uid = "1"
                const email = ""
                // addAdmin(companyID, email).then(() => {
                    
                // })
            })
            .catch((error) => {
                // Getting the Error details.
                const code = error.code;
                const message = error.message;
                const details = error.details;
                // ...
            });
    }

    function handleFormChange(event: ChangeEvent<HTMLInputElement>): void {
        setFormValues(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value, // Using computed property names
        }));
    }

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Lägg till administratör</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body>

                    <div className="form-floating mt-2">
                        <input
                            type="email"
                            name="email"
                            value={formValues.email}
                            onChange={handleFormChange}
                            required
                            className="form-control"
                            placeholder="email@example.com"></input>
                        <label className="col-form-label">Email</label>
                    </div>
                    <div className="form-floating mt-2">
                        <input
                            type="password"
                            name="password"
                            value={formValues.password}
                            onChange={handleFormChange}
                            required
                            className="form-control"
                            placeholder="Lösenord"></input>
                        <label className="col-form-label">Lösenord</label>
                    </div>
                    <div className="form-floating mt-2">
                        <input
                            type="password"
                            name="passwordValidate"
                            value={formValues.password}
                            onChange={handleFormChange}
                            required className="form-control"
                            placeholder="Lösenord"></input>
                        <label className="col-form-label">Repetera Lösenord</label>
                    </div>

                </Modal.Body>

                <Modal.Footer>
                    <button className="" type="submit">Registrera</button>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Stäng
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default NewCompanyAdminModal