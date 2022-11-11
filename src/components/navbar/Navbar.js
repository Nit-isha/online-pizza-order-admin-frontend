import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">Yolo-Pizza</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="#">Home</Link>
                            </li>
                            <li className="nav-item"><Link className="nav-link"  to="/">All Orders</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/menu">Pizza List</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/">Catalogue</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/l">Coupons list</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/">Customers list</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/">Find Order</Link></li>
                            </ul>
                        </div>
                        <form className="d-flex">
                            <button className="btn btn-outline-success" type="submit">Logout</button>
                        </form>
                    
                </div>
            </nav>

        </div>
    )
}