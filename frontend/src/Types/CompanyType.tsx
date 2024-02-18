interface CompanyAdmin {
    email: string;
}

interface Subscription {
    eventsLeft: number,
    price: number,
    recurring: true,
    renewDate: Date,
    subscribeDate: Date,
    type: number
}

export interface CompanyType {
    orgNumber: string;
    contactEmail: string;
    description: string;
    name: string;
    address: string
    city: string;
    zip: string;
    phone: string;
    admins: CompanyAdmin[];
    subscription: Subscription;
}

export function company(fetchedCompany: any) {
    const company: CompanyType = {
        orgNumber: fetchedCompany.orgNumber,
        contactEmail: fetchedCompany.contactEmail,
        name: fetchedCompany.name,
        address: fetchedCompany.address,
        city: fetchedCompany.city,
        phone: fetchedCompany.phone,
        zip: fetchedCompany.zip,
        description: fetchedCompany.description,
        admins: fetchedCompany.admins,
        subscription: subscription(fetchedCompany.subscription)
    }
    return company
}

function subscription(fetchedSubscription:any) {
    const subscription:Subscription = {
        eventsLeft: fetchedSubscription.eventsLeft,
        price: fetchedSubscription.price,
        recurring: fetchedSubscription.recurring,
        renewDate: fetchedSubscription.renewDate,
        subscribeDate: fetchedSubscription.subscribeDate,
        type: fetchedSubscription.type
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
