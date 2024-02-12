import { CompanyType } from '../../Types/CompanyType';

interface AdminConsoleProps {
    company: CompanyType,
}

function AdminConsole({ company }: AdminConsoleProps) {

    return (
        company && (
            <></>
        )
    )
}

export default AdminConsole