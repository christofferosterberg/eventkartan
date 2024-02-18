// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import SignUp from './components/CompanyComponents/CompanySignUp';
import React from 'react';
import Company from './components/CompanyComponents/Company';

function App() {
  // const domain = process.env.REACT_APP_AUTH0_DOMAIN
  // const [count, setCount] = useState(0)
  // <a className="navbar-brand text-center" href="#">BarLiv</a>

  return (
    <Auth0Provider
      domain="dev-ni7jkmfx0oybqzdf.us.auth0.com"
      clientId="N2lQXrnVixNM6vCY5EHNNwCkUrq4j9jo"
      authorizationParams={{
        redirect_uri: window.location.origin + '/admin'
      }}
    >

      <div className='d-flex flex-column' style={{ minHeight: '100vh' }}>
        <BrowserRouter>
          <div className='flex-grow-1' >

            <nav className="navbar navbar-dark p-2 ">
              <Link className="navbar-brand mx-auto" to="/hem">Ute-Livet</Link>
              {/* <Link className="navbar-brand text-center" to="/foretag">För företag</Link> */}
            </nav>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hem" element={<Home />} />
              <Route path="/foretag" element={<Company />} />
              <Route path="/registrera" element={<SignUp />} />
            </Routes>

          </div>
          <div className='footer mt-4'>
            <div className="container">
              <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <p className="col-md-4 mb-0 link-light">© 2022 Company, Inc</p>

                <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-light text-decoration-none">
                  {/* <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg> */}
                  Logga
                </a>

                <ul className="nav col-md-4 justify-content-end">
                  {/* <li className="nav-item"><a href="#" className="nav-link px-2 link-light">Hem</a></li> */}
                  <Link className="nav-link px-2 link-light" to="/hem">Hem</Link>
                <Link className="nav-link px-2 link-light" to="/foretag">För företag</Link>
                  {/* <li className="nav-item"><a href="#" className="nav-link px-2 link-light">För företag</a></li> */}
                  <li className="nav-item"><a href="#" className="nav-link px-2 link-light">Priser</a></li>
                  <li className="nav-item"><a href="#" className="nav-link px-2 link-light">FAQs</a></li>
                  {/* <li className="nav-item"><a href="#" className="nav-link px-2 link-light">Om oss</a></li> */}
                </ul>
              </footer>
            </div>
          </div>
        </BrowserRouter>
      </div>

      {/* </div> */}
    </Auth0Provider>
  )
}

export default App
