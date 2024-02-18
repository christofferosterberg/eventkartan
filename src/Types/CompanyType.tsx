interface CompanyAdmin {
    email: string;
    role: string;
}

interface Subscription {
    eventsLeft: number;
    purchaseDate: Date;
    subscriptionID: number;
}

export interface CompanyType {
    id: string;
    email: string;
    name: string;
    address: string
    city: string;
    zip: string;
    phone: string;
    admins: string[];
    subscription: Subscription;
}

export function company(id: string, fetchedCompany: any) {
    const company: CompanyType = {
        id: id,
        email: fetchedCompany.email,
        name: fetchedCompany.name,
        address: fetchedCompany.address,
        city: fetchedCompany.city,
        phone: fetchedCompany.phone,
        zip: fetchedCompany.zip,
        admins: fetchedCompany.admins,
        subscription: subscription(fetchedCompany.subscription)
    }
    return company
}

function subscription(fetchedSubscription:any) {
    const subscription:Subscription = {
        eventsLeft: fetchedSubscription.eventsLeft,
        purchaseDate: fetchedSubscription.purchaseDate,
        subscriptionID: +fetchedSubscription.subscriptionID
    }
    return subscription
}

// function createAdmins(admins: CompanyAdmin[]): CompanyAdmin[] {
//     let createdAdmins: CompanyAdmin[] = []
//     admins.forEach(admin => {
//         const createdAdmin: CompanyAdmin = {
//             email: admin.email,
//             role: admin.role
//         }
//         createdAdmins.push(createdAdmin)
//     })
//     return createdAdmins

// }
