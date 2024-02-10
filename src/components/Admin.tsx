import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import AdminConsole from './AdminConsole';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from '../firebaseConfig'

function Admin() {
    // const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    const [user, setUser] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setUser(uid)
            } else {
            }
            setIsLoading(false)
        });
    });

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <div>
            {user ? (
                <AdminConsole></AdminConsole>
            ) : (
                <div className='d-flex p-2'>
                    <div className='w-50 p-2' style={{ backgroundColor: '#FFD580', height: '75vh' }}>
                        Bild
                    </div>
                    <div className='p-2 flex-grow-1'>
                        <h1>Logga in som företag</h1>
                        {/* <button onClick={() => loginWithRedirect()}>Logga in eller skapa konto</button> */}
                        <p className='mt-2'> Eller <Link to="/registrera">skapa ett konto</Link></p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Admin