import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import AdminConsole from './CompanyOverview';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../firebaseConfig'
import CompanyOverview from './CompanyOverview';
import CompanySignIn from './CompanySignIn';
import { Company } from '../Users';
import { fetchCompany } from '../firestore';

function Admin() {
    // const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    // const [user, setUser] = useState<string | null>(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [user, setUser] = useState<Company | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [company, setCompany] = useState<Company | null>(null);
    const navigate = useNavigate();

    // async function getCompany(id: string) {
    //     const companyInfoFromStorage = sessionStorage.getItem(`company_${id}`);
    //     if (companyInfoFromStorage) {
    //         const parsedCompanyInfo = JSON.parse(companyInfoFromStorage);
    //         setUser(parsedCompanyInfo);
    //     } else {
    //         fetchCompany(id).then((fetchedCompany) => {
    //             if (fetchedCompany) {
    //                 setUser(fetchedCompany);
    //                 sessionStorage.setItem(`company_${fetchedCompany.id}`, JSON.stringify(fetchedCompany));
    //             }
    //         });
    //     }
    // }
    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {

            if (authenticatedUser) {
                const uid = authenticatedUser.uid;
                fetchCompany(uid).then((fetchedCompany) => {
                    console.log(fetchedCompany)
                    if (fetchedCompany) {
                        setCompany(fetchedCompany)
                        setIsLoading(false);
                    }
                })
            } else {
                setIsLoading(false)
            }
        });
        // Cleanup function to unsubscribe from onAuthStateChanged
        return () => unsubscribe();
    }, []);

    function logout(): void {
        sessionStorage.removeItem(`company_${company?.id}`);
        const auth = getAuth();
        signOut(auth).then(() => {
            setCompany(null)
            navigate("/");
        }).catch((error) => {
            // An error happened.
        });
    }

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <div>
            {company ? (
                <div>
                    <CompanyOverview company={company}></CompanyOverview>
                    <button className="m-2" onClick={() => logout()}>Logga ut</button>
                </div>
            ) : (
                <CompanySignIn></CompanySignIn>
            )}
        </div>
    )
}

export default Admin