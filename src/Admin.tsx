import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import AdminConsole from './AdminConsole';

function Admin() {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

    function handleLogin() {
        loginWithRedirect()
    }

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <div>
            {isAuthenticated ? (
                <AdminConsole></AdminConsole>
            ) : (
                <div className='text-center'>
                    <h1>Logga in som företag</h1>
                    <button onClick={() => handleLogin()}>Logga in</button>
                </div>
            )}
        </div>
    )
}

export default Admin