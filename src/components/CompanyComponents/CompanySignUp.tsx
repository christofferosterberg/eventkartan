import React, { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig'
import { createCompany } from '../../firestore';

interface FormValues {
    orgNumber: string,
    email: string,
    password: string,
    passwordValidate: string
}

function SignUp() {
    const [formValues, setFormValues] = useState<FormValues>({
        orgNumber: '',
        email: '',
        password: '',
        passwordValidate: ''
    })
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // if (formValues) {
        console.log(formValues)
        createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user.email)
                if (user) {
                    if (user.email) {
                        createCompany(formValues.orgNumber, user.uid, user.email).then((resp) => {
                            navigate('/foretag')
                        })
                    }
                }
            })
            .catch((error) => {
                // const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                // ..
            });
        // }
    };

    function handleFormChange(event: ChangeEvent<HTMLInputElement>): void {
        setFormValues(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value, // Using computed property names
        }));
    }

    return (
        <div className='d-flex p-2'>
            <img className="w-50" src="./music-quiz.jpeg"></img>
            <div className='p-2'>
                <h1>Registrera din bar på Barlivet</h1>
                <p>Genom att registrera ditt företag på Barlivet kan ni lägga upp event för att nå fler besökare på evenemang så som quiz, live-artister, vinprovning etc.</p>
                <p>Att registrera sig är helt gratis. Efter det får ni fem gratisannonser och därefter betalar man antingen en fast månadsavgift eller per evenemang. <Link to="/priser">Se prislista</Link></p>
                <p>Börja med att registrera dig med mailadress och lösenord. Det går att lägga till fler mailadresser sedan.</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-floating">
                        <input
                            type="text"
                            name="orgNumber"
                            value={formValues.orgNumber}
                            onChange={handleFormChange}
                            required className="form-control"
                            placeholder="0000-0000000"></input>
                        <label className="col-sm-3 col-form-label">Org-nummer</label>
                    </div>
                    <div className="form-floating mt-2">
                        <input
                            type="email"
                            name="email"
                            value={formValues.email}
                            onChange={handleFormChange}
                            required
                            className="form-control"
                            placeholder="email@example.com"></input>
                        <label className="col-sm-3 col-form-label">Email</label>
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
                        <label className="col-sm-3 col-form-label">Lösenord</label>
                    </div>
                    <div className="form-floating mt-2">
                        <input
                            type="password"
                            name="passwordValidate"
                            value={formValues.password}
                            onChange={handleFormChange}
                            required className="form-control"
                            placeholder="Lösenord"></input>
                        <label className="col-sm-3 col-form-label">Repetera Lösenord</label>
                    </div>
                    <button className="mt-2" type="submit">Registrera</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp