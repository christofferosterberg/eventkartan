import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'

function AdminConsole() {
    const { logout, isAuthenticated, user } = useAuth0();

    return (
        user && (
            <div className='text-center'>
                <h1>Välkommen {user.name} !</h1>
                <button onClick={() => logout()}>Logga ut</button>
            </div>
        )
    )
}

export default AdminConsole