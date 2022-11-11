import { useUser } from "../hooks/useUser";
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const { token, logout } = useUser();
    let navigate = useNavigate();
    return (
        <div className="logout">
            {token && <button onClick={() => { logout(); navigate("/login"); }}>Logout</button>}
        </div>
    )
}
