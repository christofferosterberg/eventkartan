import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../../firebaseConfig'
import CompanyOverview from './CompanyOverview';
import CompanySignIn from './CompanySignIn';
import { CompanyType } from '../../Types/CompanyType';
import { fetchCompany } from '../../firestore';

function Company() {
    // const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    // const [user, setUser] = useState<string | null>(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [user, setUser] = useState<Company | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [company, setCompany] = useState<CompanyType | null>(null);
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
            console.log(error)
        });
    }

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <div>
            {company ? (
                <div>
                    <div className='container p-5'>
                        <div className="row">
                            <div className="col-sm-2">
                                <div className='text-center'>
                                    <h2>{company?.name}</h2>
                                    <ul className='list-group'>
                                        <Link to='#' className=' list-group-item list-group-item-action'>Översikt</Link>
                                        <Link to='#' className=' list-group-item list-group-item-action'>Alla event</Link>
                                        <Link to='#' className=' list-group-item list-group-item-action'>Tidigare event</Link>
                                        <Link to='#' className=' list-group-item list-group-item-action'>Fakturor och betalningar</Link>
                                        <Link to='#' className=' list-group-item list-group-item-action'>Prenumeration</Link>
                                    </ul>
                                </div>
                                <button>Lägg upp event</button>
                            </div>
                            <div className="col-sm-10">
                                <div>
                                    <CompanyOverview company={company}></CompanyOverview>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <CompanyOverview company={company}></CompanyOverview> */}
                    <button className="m-2" onClick={() => logout()}>Logga ut</button>
                </div>
            ) : (
                <CompanySignIn></CompanySignIn>
            )}
        </div>
    )
}

export default Company