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
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
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
            <div className='w-50 p-2' style={{ backgroundColor: '#FFD580', height: '75vh' }}>
                Bild
            </div>
            <div className='p-2 flex-grow-1'>
                <h1>Logga in som företag</h1>
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
                    <button className="mt-2" type="submit">Logga in</button>
                </form>
                {/* <button onClick={() => loginWithRedirect()}>Logga in eller skapa konto</button> */}
                <p className='mt-2'> Eller <Link to="/registrera">skapa ett konto</Link></p>
            </div>
        </div>
    )
}

export default CompanySignIn