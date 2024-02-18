import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { auth } from '../../firebaseConfig';

function CompanySignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                // const user = userCredential.user;
                // console.log(user)
                // ...
            })
            .catch((error) => {
                // const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    };

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setEmail(event.target.value)
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setPassword(event.target.value)
    }
    return (
        <div className='d-flex p-2'>
            <img className="w-50" src="./music-quiz.jpeg"></img>
            <div className='px-5'>
                <h1 className='p-2'>Logga in som företag</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-floating">
                        <input type="email" value={email} onChange={handleEmailChange} required className="form-control" placeholder="email@example.com"></input>
                        <label className="col-form-label">Email</label>
                    </div>
                    <div className="form-floating mt-2">
                        <input type="password" value={password} onChange={handlePasswordChange} required className="form-control" placeholder="Lösenord"></input>
                        <label className="col-form-label">Lösenord</label>
                    </div>
                    <button className="mt-2" type="submit">Logga in</button>
                </form>
                {/* <button onClick={() => loginWithRedirect()}>Logga in eller skapa konto</button> */}
                <p className='mt-2'> Eller <Link to="/registrera">skapa ett konto</Link></p>
            </div>
        </div>
    )
}

export default CompanySignIn