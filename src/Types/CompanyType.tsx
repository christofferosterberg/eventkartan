export interface CompanyType {
    id: string;
    email: string;
    name:string;
}

export function createCompany(id: string, userInfo:any) {
    const company:CompanyType = {
        id: id,
        email: userInfo.email,
        name: userInfo.name
    }
    return company
}