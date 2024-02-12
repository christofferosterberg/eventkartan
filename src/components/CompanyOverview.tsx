import { useAuth0 } from '@auth0/auth0-react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useMemo, useState } from 'react'
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { fetchCompany } from '../firestore';
import { CompanyType } from '../Types/CompanyType';

interface AdminConsoleProps {
    company: CompanyType,
}

function AdminConsole({ company }: AdminConsoleProps) {

    return (
        company && (
            <div className='container p-5'>
                <div className="row">
                    <div className="col-sm-2">
                        <div className='text-center'>
                            <h2>{company?.name}</h2>
                            <ul>
                                <li>Översikt</li>
                                <li>Alla event</li>
                                <li>Tidigare event</li>
                                <li>Fakturor och betalningar</li>
                                <li>Prenumeration</li>
                            </ul>
                        </div>
                        <button>Lägg upp event</button>
                    </div>
                    <div className="col-sm-10">
                        <div>
                            <h1>Profil</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default AdminConsole