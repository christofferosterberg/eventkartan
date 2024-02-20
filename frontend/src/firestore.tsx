import { doc, setDoc, getDoc, updateDoc, collection, query, getDocs, where, arrayUnion } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { CompanyType, company } from "./Types/CompanyType";
import { SubscriptionType, subscription } from "./Types/SubscriptionType";
import axios from "axios";
import { EventType, makeEvent } from "./Types/EventType";


export async function fetchCompanies(userEmail: string) {
    // const companyInfoFromStorage = sessionStorage.getItem(`company_${id}`);
    // if (companyInfoFromStorage) {	
    //     return JSON.parse(companyInfoFromStorage);	   
    // } else {
    const url = `http://127.0.0.1:8000/api/get_companies_by_user_email/${userEmail}/`;

    console.log("hämtar företagsinfo..")
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // console.log(data)
        return company(data.companies[0])
        // setCompanies(data.companies);
    } catch (error) {
        console.error("Could not fetch companies:", error);
    }
}

export async function createCompany(orgNumber: string, uid: string, userEmail: string) {
    return setDoc(doc(db, "companies", orgNumber), {
        address: '',
        city: '',
        email: '',
        name: '',
        phone: '',
        zip: '',
        admins: [{
            adminID: uid,
            email: userEmail,
            role: 'Ägare'
        }]
    }).then((resp) => {
        return resp
    });
}

export async function updateCompany(company: CompanyType) {
    const updatedCompany = {
        name: company.name,
        description: company.description,
        contactEmail: company.contactEmail,
        address: company.address,
        city: company.city,
        zip: company.zip,
        phone: company.phone
    };

    axios.post(`http://localhost:8000/api/company/${company.orgNumber}/update/`, updatedCompany)
        .then((response) => {
            console.log('Success:', response.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

export async function addAdmin(companyID: string, email: string) {
    // Reference to the document containing the email list
    const companyRef = doc(db, "companies", companyID);

    await updateDoc(companyRef, {
        regions: arrayUnion(email)
    });
}

export async function fetchSubscriptions() {
    const url = `http://127.0.0.1:8000/api/subscription_options/`;
    const subscriptions: SubscriptionType[] = []

    console.log("hämtar prenumerationer..")

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.subscription_options.length > 0) {
            data.subscription_options.forEach((fetchedSubscription: any) => {
                subscriptions.push(subscription(fetchedSubscription))
            });
            return subscriptions
        }
    } catch (error) {
        console.error("Could not fetch companies:", error);
    }

    return subscriptions
}

export async function fetchEvents() {
    const url = `http://127.0.0.1:8000/api/events/`;
    const events: EventType[] = []
    console.log("hämtar events..")
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        if (data.length > 0) {
            data.forEach((fetchedEvent: any) => {
                console.log(fetchedEvent)
                events.push(makeEvent(fetchedEvent))
            });
            return events
        }
    } catch (error) {
        console.error("Could not fetch events:", error);
    }
    return events
}

export async function createEvent(eventDetails: any) {
    const testEvent = {
        "address": "Masthuggstorget",
        "book": "",
        "date": "2024-02-20T00:00:00", // Example date in the correct format
        "host": "123456789", // Ensure this is an existing Company ID
        "longDescription": "aa",
        "shortDescription": "bb",
        "title": "Event Title",
        "img": "hejj",
        "latitude": 57.698558,
        "longitude": 12
    }

    axios.post(`http://localhost:8000/api/events/create_event/`, testEvent)
        .then((response) => {
            console.log('Success:', response.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}