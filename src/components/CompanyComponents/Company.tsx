import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../../firebaseConfig'
import CompanyOverview from './CompanyOverview';
import CompanySignIn from './CompanySignIn';
import { CompanyType } from '../../Types/CompanyType';
import { fetchCompany } from '../../firestore';
import CompanySubscriptions from './CompanySubscriptions';
import CompanyEvents from './CompanyEvents';

function Company() {
    const [isLoading, setIsLoading] = useState(true);
    const [company, setCompany] = useState<CompanyType | null>(null);
    const [selectedComponent, setSelectedComponent] = useState<string | null>('overview');
    const [activeButton, setActiveButton] = useState<string | null>('overview');
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {

            if (authenticatedUser) {
                const uid = authenticatedUser.uid;
                const userEmail = authenticatedUser.email
                if (!company) { // company har precis uppdaterats
                    if (userEmail) {
                        fetchCompany(userEmail).then((fetchedCompany) => {
                            console.log(fetchedCompany)
                            if (fetchedCompany) {
                                setCompany(fetchedCompany)
                                setIsLoading(false);
                            }
                        })
                    }
                }

            } else {
                setIsLoading(false)
            }
        });
        // Cleanup function to unsubscribe from onAuthStateChanged
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (company) {
            sessionStorage.setItem(`company_${company.id}`, JSON.stringify(company));
        }
    }, [company]);

    function logout(): void {
        sessionStorage.removeItem(`company_${company?.id}`);
        const auth = getAuth();
        signOut(auth).then(() => {
            setCompany(null)
            navigate("/foretag");
        }).catch((error) => {
            // An error happened.
            console.log(error)
        });
    }

    function handleSelectedComponent(component: string) {
        setSelectedComponent(component);
        setActiveButton(component);
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
                            <div className="col-sm-3">
                                <div className='text-center'>
                                    <h2>{company?.name}</h2>
                                    <ul className='list-group'>
                                        <Link to='#' onClick={() => handleSelectedComponent('overview')} className={`list-group-item list-group-item-action ${activeButton === 'overview' ? 'active-company-view' : ''}`}>Översikt</Link>
                                        <Link to='#' onClick={() => handleSelectedComponent('events')} className={`list-group-item list-group-item-action ${activeButton === 'events' ? 'active-company-view' : ''}`}>Alla event</Link>
                                        {/* <Link to='#' onClick={handleActiveCompanyView} className=' list-group-item list-group-item-action'>Tidigare event</Link>
                                        <Link to='#' onClick={handleActiveCompanyView} className=' list-group-item list-group-item-action'>Fakturor och betalningar</Link> */}
                                        <Link to='#' onClick={() => handleSelectedComponent('subscriptions')} className={`list-group-item list-group-item-action ${activeButton === 'subscriptions' ? 'active-company-view' : ''}`}>Prenumeration</Link>
                                    </ul>
                                </div>
                                <button>Lägg upp event</button>
                                <button className="m-2" onClick={() => logout()}>Logga ut</button>
                            </div>
                            <div className="col-sm-9">
                                <div>
                                    {selectedComponent === 'overview' && <CompanyOverview company={company} setCompany={setCompany} />}
                                    {selectedComponent === 'subscriptions' && <CompanySubscriptions company={company} />}
                                    {selectedComponent === 'events' && <CompanyEvents company={company} />}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <CompanyOverview company={company}></CompanyOverview> */}

                </div>
            ) : (
                <CompanySignIn></CompanySignIn>
            )}
        </div>
    )
}

export default Company