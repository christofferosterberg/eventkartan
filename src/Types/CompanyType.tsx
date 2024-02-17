export interface CompanyAdmin {
    email: string;
    role: string;
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
        admins: fetchedCompany.admins
    }
    return company
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
