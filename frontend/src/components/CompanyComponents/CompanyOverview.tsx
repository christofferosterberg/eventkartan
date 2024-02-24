import { ChangeEvent, useEffect, useState } from 'react';
import { CompanyType } from '../../Types/CompanyType';
import { updateCompany } from '../../firestore';
import NewCompanyAdminModal from './NewCompanyAdminModal';
import AddressInput from '../Misc/AddressInput';

interface AdminConsoleProps {
    company: CompanyType,
    setCompany: React.Dispatch<React.SetStateAction<CompanyType | null>>;
}

function AdminConsole({ company, setCompany }: AdminConsoleProps) {

    const [companyInfo, setCompanyInfo] = useState(company);
    const [showModal, setShowModal] = useState(false)

    const handleCloseModal = () => setShowModal(false);
    const handleSaveChanges = () => setShowModal(false);
    const [billPlace, setBillPlace] = useState<any>(null)
    const [billZip, setBillZip] = useState(company.zip)
    const [visitPlace, setvisitPlace] = useState<any>(null)
    const [visitZip, setVisitZip] = useState(company.zip)

    function handleSubmit(event: any) {
       
        event.preventDefault()
        console.log(billPlace)
        // console.log(billPlace)
        // updateCompany(companyInfo).then(() => {
        //     setCompany(companyInfo)
        // })
    }

    function handleFormChange(event: ChangeEvent<HTMLInputElement>) {
        // console.log(event)
        setCompanyInfo(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value, // Using computed property names
        }));
    }


    // function handleAddressChange() {
    //     // console.log(event)
    //     setBillPlace
    // }

    function openModal() {
        setShowModal(true)
    }

    function handleZipChange(event: ChangeEvent<HTMLInputElement>): void {
        setBillZip(event.target.value)
    }

    return (
        <div>
            <h2>Uppgifter</h2>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="form-floating col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="orgNumber"
                        value={companyInfo.orgNumber}
                        disabled></input>
                    <label className="mx-2">Organisationsnummer</label>
                </div>
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
                        value={companyInfo.contactEmail}
                        onChange={handleFormChange}></input>
                    <label className="mx-2">Kontakt-mail (för kunder)</label>
                </div>
                <div className="form-floating col-md-6">
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
                    <AddressInput
                        label="Faktureringsadress"
                        name="address"
                        value={companyInfo.address}
                        setPlace={setBillPlace}
                        setZip={setBillZip}
                    />
                </div>
                <div className="col-md-6 form-floating">
                    <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="zip"
                        value={billZip}
                        onChange={handleZipChange}></input>
                    <label className="mx-2">Postnummer faktureringsadress</label>
                </div>
                <div className="col-md-6 form-floating">
                    <AddressInput
                        label="Besöksadress"
                        name="address"
                        value={companyInfo.address}
                        setPlace={setvisitPlace}
                        setZip={setVisitZip}
                    />
                </div>
                <div className="col-md-6 form-floating">
                    <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="zip"
                        value={visitZip}
                        onChange={handleZipChange}></input>
                    <label className="mx-2">Postnummer besöksadress</label>
                </div>
                <div className="col-12">
                    <button type="submit" className="">Uppdatera info</button>
                </div>
                <div className='col-md-12 d-flex'>
                    <h5>Administratörer</h5>
                </div>
            </form>

            <div className="form-floating col-md-6">
                {companyInfo.admins.map((admin) => (
                    <p>{admin.email}</p>
                ))}
                <button className='admin-plus-button' onClick={openModal}>Lägg till ny</button>
            </div>
            {showModal && (
                <NewCompanyAdminModal
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                    handleSaveChanges={handleSaveChanges} companyID={company.orgNumber}>
                </NewCompanyAdminModal>
            )}
        </div>
    )
}

export default AdminConsole