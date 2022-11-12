import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../../hooks/useUser';

export default function NavBar() {
    let navigate = useNavigate();
    const { token, logout } = useUser();
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">Yolo-Pizza</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/dashboard">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/viewallorders">All Orders</Link>
                            </li>
                            <li className="nav-item"><Link className="nav-link" to="/menu">Pizza List</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/coupon">Coupons list</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/viewcustomers">Customers list</Link></li>
                        </ul>
                        <form className="d-flex justify-content-end">
                            <button className="btn btn-outline-success" type="submit" onClick={() => { logout(); navigate("/login") }} >Logout</button>
                        </form>
                    </div>
                   
                </div>
            </nav>
        </>
    )
}