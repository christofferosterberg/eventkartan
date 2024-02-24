import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../../firebaseConfig'
import CompanyOverview from './CompanyOverview';
import CompanySignIn from './CompanySignIn';
import { CompanyType } from '../../Types/CompanyType';
import { fetchCompanies } from '../../firestore';
import CompanySubscriptions from './CompanySubscriptions';
import CompanyEvents from './CompanyEvents';
import CompanyPayments from './CompanyPayments';
import CreateEventModal from './CreateEventModal';
import CreateEvent from './CreateEvent';

function Company() {
    const [isLoading, setIsLoading] = useState(true);
    const [company, setCompany] = useState<CompanyType | null>(null);
    const [selectedComponent, setSelectedComponent] = useState<string | null>('overview');
    const [createEventSelected, setCreateEventSelected] = useState(false);
    const [activeButton, setActiveButton] = useState<string | null>('overview');
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false)

    const handleCloseModal = () => setShowModal(false);
    const handleSaveChanges = () => setShowModal(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {

            if (authenticatedUser) {
                // const uid = authenticatedUser.uid;
                // sessionStorage.setItem(`user_${uid}`, JSON.stringify(uid));
                const userEmail = authenticatedUser.email
                if (!company) {
                    if (userEmail) {
                        fetchCompanies(userEmail).then((fetchedCompany) => {
                            if (fetchedCompany) {
                                // console.log(fetchedCompany)
                                setCompany(fetchedCompany)
                                setIsLoading(false);
                            }

                        })
                    }
                    setIsLoading(false)
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
            sessionStorage.setItem(`company_${company.orgNumber}`, JSON.stringify(company));
        }
    }, [company]);

    function logout(): void {
        sessionStorage.removeItem(`company_${company?.orgNumber}`);
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

    function openModal() {
        setShowModal(true)
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
                                        <Link to='#' onClick={() => handleSelectedComponent('createEvent')} className={`list-group-item list-group-item-action ${activeButton === 'createEvent' ? 'active-company-view' : ''}`}>Lägg upp event</Link>
                                        <Link to='#' onClick={() => handleSelectedComponent('events')} className={`list-group-item list-group-item-action ${activeButton === 'events' ? 'active-company-view' : ''}`}>Alla event</Link>
                                        {/* <Link to='#' onClick={handleActiveCompanyView} className=' list-group-item list-group-item-action'>Tidigare event</Link>
                                        <Link to='#' onClick={handleActiveCompanyView} className=' list-group-item list-group-item-action'>Fakturor och betalningar</Link> */}
                                        <Link to='#' onClick={() => handleSelectedComponent('subscriptions')} className={`list-group-item list-group-item-action ${activeButton === 'subscriptions' ? 'active-company-view' : ''}`}>Prenumeration</Link>
                                        <Link to='#' onClick={() => handleSelectedComponent('payments')} className={`list-group-item list-group-item-action ${activeButton === 'payments' ? 'active-company-view' : ''}`}>Betalningar</Link>
                                        
                                        <button className="list-group-item list-group-item-action" onClick={() => logout()}>Logga ut</button>
                                    </ul>
                                </div>
                                {/* <button onClick={openModal}>Skapa event</button> */}
                                
                            </div>
                            <div className="col-sm-9">
                                <div>
                                    {selectedComponent === 'createEvent' && <CreateEvent company={company}/>}
                                    {selectedComponent === 'overview' && <CompanyOverview company={company} setCompany={setCompany} />}
                                    {selectedComponent === 'subscriptions' && <CompanySubscriptions company={company} />}
                                    {selectedComponent === 'events' && <CompanyEvents company={company} />}
                                    {selectedComponent === 'payments' && <CompanyPayments company={company} />}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <CompanyOverview company={company}></CompanyOverview> */}
                    {/* <CreateEventModal
                        showModal={showModal}
                        handleCloseModal={handleCloseModal}
                        handleSaveChanges={handleSaveChanges} 
                        company={company}>
                    </CreateEventModal> */}
                </div>
            ) : (
                <CompanySignIn></CompanySignIn>
            )}
        </div>
    )
}

export default Company