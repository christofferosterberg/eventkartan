export interface Company {
    id: string;
    email: string;
    name:string;
}

export function createCompany(id: string, userInfo:any) {
    const company:Company = {
        id: id,
        email: userInfo.email,
        name: userInfo.name
    }
    return company
}