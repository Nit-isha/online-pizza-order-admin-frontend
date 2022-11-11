// import React from 'react'
import Logout from '../../authentication/Logout';
import { useNavigate } from 'react-router-dom';
import { useUser  } from '../../hooks/useUser';

export default function Dashboard() {

  let navigate = useNavigate();
  const { token } = useUser();

  return (

    <div>
      <button type="button" className="btn btn-primary mx-2" >
        Check All Orders
      </button>
      <button type="button" className="btn btn-primary mx-2" >
        Add/Update/Remove Pizza
      </button>
      <button type="button" className="btn btn-primary mx-2" >
        View Catalouge
      </button>
      <button type="button" className="btn btn-primary mx-2" >
        Add/Update/Remove Coupons
      </button>
      <button type="button" className="btn btn-primary mx-2" >
        View Customer Details
      </button>
      <button type="button" className="btn btn-primary mx-2" >
        Find Order 
      </button>
      <Logout />
      {/* {!token && <button onClick={() => navigate("/login")}>Login</button>} */}
    </div>
  );
}
