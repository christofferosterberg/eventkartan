import { ChangeEvent, useState } from 'react';
import { CompanyType } from '../../Types/CompanyType';
import { updateCompany } from '../../firestore';

interface AdminConsoleProps {
    company: CompanyType,
    setCompany: React.Dispatch<React.SetStateAction<CompanyType | null>>;
}

function AdminConsole({ company }: AdminConsoleProps) {

    const [companyInfo, setCompanyInfo] = useState(company);

    function handleUpdate(event: any) {
        event.preventDefault()
        updateCompany(companyInfo)
        // throw new Error('Function not implemented.');
    }

    function handleFormChange(event: ChangeEvent<HTMLInputElement>) {
        console.log(event.target.name);
        console.log(event.target.value);
        setCompanyInfo(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value, // Using computed property names
        }));
    }

    // const handleAdminChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //     const { name, value } = event.target;
    //     // Dynamically update based on input name
    //     setCompanyInfo(prev => {
    //       const newState = { ...prev }; // Shallow copy of the state
    //       // Assuming name is in format "admins[0].email" or similar
    //       const nameParts = name.split(/[\[\].]+/); // Splits into ["admins", "0", "email"]
    //       if (nameParts[0] === 'admins') {
    //         const index = parseInt(nameParts[1], 10); // Get the admin index
    //         const propName = nameParts[2]; // Get the property name (e.g., "email")
    //         // Update the specific admin property
    //         newState.admins[index] = {
    //           ...newState.admins[index],
    //           [propName]: value,
    //         };
    //       }
    //       return newState;
    //     });
    //   };

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
                    <button className='mx-2'>Lägg till ny</button>
                </div>
                </form>



                <div className="form-floating col-md-6">
                    <p>{companyInfo.admins[0]}</p>
                    {/* <input
                        type="email"
                        className="form-control"
                        placeholder="name@example.com"
                        name="admins[0].email"
                        value={companyInfo.admins[0]}></input>
                    <label className='mx-2'>Mail (för inloggning)</label> */}
                </div>
                {/* <div className="form-floating col-md-3">
                    <select className="form-select" name="admins[0].role" >
                        <option selected>Ägare</option>
                        <option value="1">Medarbetare</option>
                    </select>
                    <label className='mx-2'>Roll</label>
                </div> */}
                {/* <div className='col-md-3'> */}
                {/* <button>Lägg till ny</button> */}
                {/* </div> */}


            
        </div>
    )
}

export default AdminConsole