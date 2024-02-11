import { useAuth0 } from '@auth0/auth0-react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useMemo, useState } from 'react'
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { fetchCompany } from '../firestore';
import { Company } from '../Users';

function AdminConsole() {
    
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // const memoizedFetchUser = useMemo(() => fetchUser, []);

    // State for storing the product list
    const [user, setUser] = useState<Company | null>(null);
    // State for tracking any relevant dependencies for memoization
    const [dependency, setDependency] = useState(0);

    // Define a memoized function for fetching the product list
    const memoCompany = useMemo(() => async (id:string) => {
        const fetchedCompany = await fetchCompany(id)
        if (fetchedCompany) {
            setUser(fetchedCompany)
            setIsLoading(false)
        }
        // try {
        //     const response = await axios.get('/api/products'); // Replace with your API endpoint
        //     setProducts(response.data);
        // } catch (error) {
        //     console.error('Error fetching product list:', error);
        // }
    }, [dependency]);

    // Fetch the product list on component mount
    // useEffect(() => {
    //     fetchProductList();
    // }, [fetchProductList]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
            if (authenticatedUser) {
                const uid = authenticatedUser.uid;
                memoCompany(uid)
            }
        });
        // Cleanup function to unsubscribe from onAuthStateChanged
        return () => unsubscribe();
    }, [memoCompany]);

    function logout(): void {
        const auth = getAuth();
        signOut(auth).then(() => {
            setUser(null)
            navigate("/");
        }).catch((error) => {
            // An error happened.
        });
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