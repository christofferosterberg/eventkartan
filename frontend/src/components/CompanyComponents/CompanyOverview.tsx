import { ChangeEvent, useState } from 'react';
import { CompanyType } from '../../Types/CompanyType';
import { updateCompany } from '../../firestore';
import NewCompanyAdminModal from './NewCompanyAdminModal';

interface AdminConsoleProps {
    company: CompanyType,
    setCompany: React.Dispatch<React.SetStateAction<CompanyType | null>>;
}

function AdminConsole({ company, setCompany }: AdminConsoleProps) {

    const [companyInfo, setCompanyInfo] = useState(company);
    const [showModal, setShowModal] = useState(false)

    const handleCloseModal = () => setShowModal(false);
    const handleSaveChanges = () => setShowModal(false);

    function handleUpdate(event: any) {
        event.preventDefault()
        updateCompany(companyInfo).then(() => {
            setCompany(companyInfo)
        })
    }

    function handleFormChange(event: ChangeEvent<HTMLInputElement>) {
        console.log(event.target.name);
        console.log(event.target.value);
        setCompanyInfo(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value, // Using computed property names
        }));
    }

    function openModal() {
        setShowModal(true)
    }

    return (
        <div>
            <h2>Uppgifter</h2>
            <form className="row g-3">
                <div className="form-floating col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="name"
                        value={companyInfo.name}
                        onChange={handleFormChange}></input>
                    <label className="mx-2">Namn</label>
                </div>
                <div className="form-floating col-md-6">
                    <input
                        type="email"
                        className="form-control"
                        placeholder=""
                        name="email"
                        value={companyInfo.email}
                        onChange={handleFormChange}></input>
                    <label className="mx-2">Kontakt-mail (för kunder)</label>
                </div>
                <div className="form-floating col-md-12">
                    <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="phone"
                        value={companyInfo.phone}
                        onChange={handleFormChange}></input>
                    <label className="mx-2">Telefon</label>
                </div>
                <div className="col-md-6 form-floating">
                    <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="address"
                        value={companyInfo.address}
                        onChange={handleFormChange}></input>
                    <label className="mx-2">Adress</label>
                </div>
                <div className="col-md-4 form-floating">
                    <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="city"
                        value={companyInfo.city}
                        onChange={handleFormChange}></input>
                    <label className="mx-2">Stad</label>
                </div>
                <div className="col-md-2 form-floating">
                    <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="zip"
                        value={companyInfo.zip}
                        onChange={handleFormChange}></input>
                    <label className="mx-2">Postnummer</label>
                </div>
                <div className="col-12">
                    <button type="submit" onClick={handleUpdate} className="">Uppdatera info</button>
                </div>
                <div className='col-md-12 d-flex'>
                    <h5>Administratörer</h5>
                </div>
            </form>

            <div className="form-floating col-md-6">
                <p>{companyInfo.admins[0]}</p>
                <button className='admin-plus-button' onClick={openModal}>Lägg till ny</button>
            </div>
            {showModal && (
                <NewCompanyAdminModal
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                    handleSaveChanges={handleSaveChanges} companyID={company.id}>
                </NewCompanyAdminModal>
            )}
        </div>
    )
}

export default AdminConsole