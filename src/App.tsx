// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Home from './Home'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <nav className="navbar navbar-dark p-2" style={{ backgroundColor: '#F99C2F' }}>
        <a className="navbar-brand text-center" href="#">Eventkartan</a>
      </nav>
      <Home></Home>
      {/* <div className="container" style={{ backgroundColor: '#F99C2F' }}> */}
        <footer className="py-3 my-4" style={{ backgroundColor: '#F99C2F' }}>
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Home</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Features</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Pricing</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">FAQs</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">About</a></li>
          </ul>
          <p className="text-center text-muted">© 2022 Company, Inc</p>
        </footer>
      {/* </div> */}
    </>
  )
}

export default App
