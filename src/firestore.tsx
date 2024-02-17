import { doc, setDoc, getDoc, updateDoc, collection, query, getDocs, where } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { CompanyType, company } from "./Types/CompanyType";


export async function fetchCompany(userEmail: string) {
    // const companyInfoFromStorage = sessionStorage.getItem(`company_${id}`);
    // if (companyInfoFromStorage) {
    //     return JSON.parse(companyInfoFromStorage);
    // } else {
    console.log("hämtar företagsinfo..")

    const companiesRef = collection(db, 'companies'); // 'companies' is the name of your collection
    // Create a query against the collection
    // Note: This assumes you have set up your Firestore rules to allow this query
    console.log(userEmail)
    const q = query(companiesRef, where('admins', 'array-contains', userEmail));

    try {
        const querySnapshot = await getDocs(q);
        const companies: CompanyType[] = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
              companies.push(company(doc.id, doc.data()));
        });
        if (companies.length > 0) {
            return companies[0]; // Returns an array of companies matching the query
        } else {
            return null
        }
    } catch (error) {
        console.error("Error fetching company by admin ID:", error);
        throw error; // or handle the error as needed
    }

    // const docRef = doc(db, "companies", id);
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //     // console.log("Document data:", docSnap.data());
    //     return company(id, docSnap.data())
    //     // console.log("uppdaterar company i sessionstorage")
    //     // sessionStorage.setItem(`company_${id}`, JSON.stringify(company));
    //     // return company
    // } else {
    //     // docSnap.data() will be undefined in this case
    //     console.log("No such document!");
    // }
    // // }
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
    const companyRef = doc(db, "companies", company.id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(companyRef, {
        address: company.address,
        city: company.city,
        email: company.email,
        name: company.name,
        phone: company.phone,
        zip: company.zip
    })

}