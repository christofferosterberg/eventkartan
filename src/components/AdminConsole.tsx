import { useAuth0 } from '@auth0/auth0-react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useMemo, useState } from 'react'
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { fetchCompany } from '../firestore';
import { Company } from '../Users';

function AdminConsole() {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<Company | null>(null);
    const navigate = useNavigate();

    async function getCompany(id: string) {
        const companyInfoFromStorage = sessionStorage.getItem(`company_${id}`);
        if (companyInfoFromStorage) {
            const parsedCompanyInfo = JSON.parse(companyInfoFromStorage);
            setUser(parsedCompanyInfo);
        } else {
            fetchCompany(id).then((fetchedCompany) => {
                if (fetchedCompany) {
                    setUser(fetchedCompany);
                    sessionStorage.setItem(`company_${fetchedCompany.id}`, JSON.stringify(fetchedCompany));
                }
            });

        }
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
            if (authenticatedUser) {
                const uid = authenticatedUser.uid;
                getCompany(uid).then(() => {
                    setIsLoading(false);
                })
            }
        });
        // Cleanup function to unsubscribe from onAuthStateChanged
        return () => unsubscribe();
    }, []);

    function logout(): void {
        sessionStorage.removeItem(`company_${user?.id}`);
        const auth = getAuth();
        signOut(auth).then(() => {
            setUser(null)
            navigate("/");
        }).catch((error) => {
            // An error happened.
        });
    }

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        user && (
            <div className='text-center'>
                <h1>Välkommen {user.email} !</h1>
                <button onClick={() => logout()}>Logga ut</button>
            </div>
        )
    )
}

export default AdminConsole