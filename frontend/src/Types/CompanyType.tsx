interface CompanyAdmin {
    email: string;
}

interface Subscription {
    id: number,
    eventsLeft: number,
    price: number,
    recurring: true,
    renewDate: Date,
    subscribeDate: Date,
    type: number
    subscriptionOption: number
}

export interface CompanyType {
    orgNumber: string;
    contactEmail: string;
    description: string;
    name: string;
    billAddress: string
    billCity: string
    billZip: string
    billCountry: string
    visitAddress: string
    visitCity: string
    visitZip: string
    visitCountry: string
    visitLatitude: number
    visitLongitude: number
    phone: string;
    admins: CompanyAdmin[];
    subscription: Subscription;
}

export function company(fetchedCompany: any) {
    const company: CompanyType = {
        orgNumber: fetchedCompany.orgNumber,
        contactEmail: fetchedCompany.contactEmail,
        name: fetchedCompany.name,
        phone: fetchedCompany.phone,
        description: fetchedCompany.description,
        admins: fetchedCompany.admins,
        subscription: subscription(fetchedCompany.subscription),
        billAddress: fetchedCompany.billAddress,
        billCity: fetchedCompany.billCity,
        billZip: fetchedCompany.billZip,
        visitAddress: fetchedCompany.visitAddress,
        visitCity: fetchedCompany.visitCity,
        visitZip: fetchedCompany.visitZip,
        billCountry: fetchedCompany.billCountry,
        visitCountry: fetchedCompany.visitCountry,
        visitLatitude: fetchedCompany.visitLatitude,
        visitLongitude: fetchedCompany.visitLongitude
    }
    return company
}

export function subscription(fetchedSubscription:any) {
    const subscription:Subscription = {
        eventsLeft: fetchedSubscription.eventsLeft,
        price: fetchedSubscription.price,
        recurring: fetchedSubscription.recurring,
        renewDate: fetchedSubscription.renewDate,
        subscribeDate: fetchedSubscription.subscribeDate,
        type: fetchedSubscription.type,
        id: fetchedSubscription.id,
        subscriptionOption: fetchedSubscription.subscriptionOption
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
