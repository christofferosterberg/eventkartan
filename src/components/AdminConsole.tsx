import { useAuth0 } from '@auth0/auth0-react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import app from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

function AdminConsole() {
    const [user, setUser] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

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

    function logout(): void {
        const auth = getAuth();
        signOut(auth).then(() => {
            setUser(null)
            navigate("/");
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        user && (
            <div className='text-center'>
                <h1>Välkommen {user} !</h1>
                <button onClick={() => logout()}>Logga ut</button>
            </div>
        )
    )
}

export default AdminConsole