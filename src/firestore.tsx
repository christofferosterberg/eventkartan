import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { createCompany } from "./Types/CompanyType";


export async function fetchCompany(id: string) {
    const companyInfoFromStorage = sessionStorage.getItem(`company_${id}`);
    if (companyInfoFromStorage) {
        return JSON.parse(companyInfoFromStorage);
    } else {
        console.log("hämtar företagsinfo..")
        const docRef = doc(db, "companies", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return createCompany(id, docSnap.data())
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }


}