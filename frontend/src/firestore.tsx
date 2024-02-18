import { doc, setDoc, getDoc, updateDoc, collection, query, getDocs, where, arrayUnion } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { CompanyType, company } from "./Types/CompanyType";
import { SubscriptionType, subscription } from "./Types/SubscriptionType";


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

    // const companiesRef = collection(db, 'companies');
    // console.log(userEmail)
    // const q = query(companiesRef, where('admins', 'array-contains', userEmail));

    // try {
    //     const querySnapshot = await getDocs(q);
    //     const companies: CompanyType[] = [];
    //     querySnapshot.forEach((doc) => {
    //         console.log(doc.id, " => ", doc.data());
    //         companies.push(company(doc.id, doc.data()));
    //     });
    //     if (companies.length > 0) {
    //         return companies[0];
    //     } else {
    //         return null
    //     }
    // } catch (error) {
    //     console.error("Error fetching company by admin ID:", error);
    //     throw error;
    // }
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
    // const companyRef = doc(db, "companies", company.id);

    // // Set the "capital" field of the city 'DC'
    // await updateDoc(companyRef, {
    //     address: company.address,
    //     city: company.city,
    //     email: company.email,
    //     name: company.name,
    //     phone: company.phone,
    //     zip: company.zip
    // })
}

export async function addAdmin(companyID: string, email: string) {
    // Reference to the document containing the email list
    const companyRef = doc(db, "companies", companyID);

    await updateDoc(companyRef, {
        regions: arrayUnion(email)
    });
}

export async function fetchSubscriptions() {
    const subscriptions: SubscriptionType[] = []

    console.log("hämtar prenumerationer..")

    const querySnapshot = await getDocs(collection(db, "subscriptions"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        subscriptions.push(subscription(doc.id, doc.data()))
    });

    return subscriptions
}