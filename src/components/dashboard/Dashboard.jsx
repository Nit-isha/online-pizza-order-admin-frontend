// import React from 'react'
import Logout from '../../authentication/Logout';
import { useNavigate } from 'react-router-dom';
import { useUser  } from '../../hooks/useUser';



export default function Dashboard() {

  let navigate = useNavigate();
  const { token } = useUser();

  return (
    <>
    <div className='my-3'>
      <button type="button"  className="btn btn-primary mx-2" onClick={() => navigate("/viewallorders")} >
        Check All Orders
      </button>
      <button type="button" onClick={() => navigate("/menu")} className="btn btn-primary mx-2" >
        Add/Update/Remove Pizza
      </button>
      <button type="button" className="btn btn-primary mx-2" >
        View Catalouge
      </button>
      <button type="button" className="btn btn-primary mx-2" onClick={() => navigate("/coupon")}>
        Add/Update/Remove Coupons
      </button>
      <button type="button" className="btn btn-primary mx-2" onClick={() => navigate("/viewcustomers")}>
        View Customer Details
      </button>
      <button type="button" className="btn btn-primary mx-2" >
        Find Order 
      </button>
      <Logout />
      {/* {!token && <button onClick={() => navigate("/login")}>Login</button>} */}
    </div>
    </>
  );
}
