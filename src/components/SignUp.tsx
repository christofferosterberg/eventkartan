import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {auth} from '../firebaseConfig'

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (event: any) => {
        // console.log(event.target.value)
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event: any) => {
        // console.log(event.target.value)
        setPassword(event.target.value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                navigate('/admin')
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    };

    return (
        <div className='d-flex p-2'>
            <div className='p-2 w-75' style={{ backgroundColor: '#FFD580', height: '75vh' }}>
                Bild
            </div>
            <div className='p-2 flex-grow-1'>
                <h1>Registrera din bar på Barlivet</h1>
                <p>Genom att registrera ditt företag på Barlivet kan ni lägga upp event för att nå fler besökare på evenemang så som quiz, live-artister, vinprovning etc.</p>
                <p>Att registrera sig är helt gratis. Efter det får ni fem gratisannonser och därefter betalar man antingen en fast månadsavgift eller per evenemang. <Link to="/priser">Se prislista</Link></p>
                <p>Börja med att registrera dig med mailadress och lösenord. Det går att lägga till fler mailadresser sedan.</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" value={email} onChange={handleEmailChange} required className="form-control" placeholder="email@example.com"></input>
                        </div>
                    </div>
                    <div className="form-group row mt-2">
                        <label className="col-sm-2 col-form-label">Lösenord</label>
                        <div className="col-sm-10">
                            <input type="password" value={password} onChange={handlePasswordChange} required className="form-control" placeholder="Lösenord"></input>
                        </div>
                    </div>
                    <button className="mt-2" type="submit">Registrera</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp