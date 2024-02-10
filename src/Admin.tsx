import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import AdminConsole from './AdminConsole';
import { Link } from 'react-router-dom';

function Admin() {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <div>
            {isAuthenticated ? (
                <AdminConsole></AdminConsole>
            ) : (
                <div className='d-flex p-2'>
                    <div className='w-50 p-2' style={{ backgroundColor: '#FFD580', height: '75vh' }}>
                        Bild
                    </div>
                    <div className='p-2 flex-grow-1'>
                        <h1>Logga in som företag</h1>
                        <button onClick={() => loginWithRedirect()}>Logga in</button>
                        <p className='mt-2'> Eller <Link to="/registrera">Skapa ett konto</Link></p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Admin