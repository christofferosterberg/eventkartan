import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
    const { loginWithRedirect } = useAuth0();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Call Auth0 Management API to create new user
            axios.post('https://dev-ni7jkmfx0oybqzdf.us.auth0.com/api/v2/users', formData);
            // Handle success
            alert('User registered successfully!');

            // After registration, redirect user to login page
            loginWithRedirect();
        } catch (error) {
            // Handle registration error
            alert('Registration failed. Please try again.');
        }
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
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="staticEmail" placeholder="email@example.com"></input>
                        </div>
                    </div>
                    <div className="form-group row mt-2">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Lösenord</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="inputPassword" placeholder="Password"></input>
                        </div>
                    </div>
                    <button className="mt-2" type="submit">Registrera</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp