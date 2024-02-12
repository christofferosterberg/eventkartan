import { CompanyType } from '../../Types/CompanyType';

interface AdminConsoleProps {
    company: CompanyType,
}

function AdminConsole({ company }: AdminConsoleProps) {

    return (
        <div>{company.name}</div>
    )
}

export default AdminConsole