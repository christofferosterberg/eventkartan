export interface Company {
    id: string;
    email: string;
}

export function createCompany(id: string, userInfo:any) {
    const company:Company = {
        id: id,
        email: userInfo.email
    }
    return company
}