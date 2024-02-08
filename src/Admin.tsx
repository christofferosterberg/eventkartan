import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';

function Admin() {
    const { loginWithRedirect } = useAuth0();
    return (
        <div>
            <h1>Logga in som företag</h1>
            <button onClick={() => loginWithRedirect()}>Logga in med Auth0</button>
        </div>
    )
}

export default Admin