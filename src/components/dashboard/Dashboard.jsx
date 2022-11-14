import React, { useState } from 'react'
import Logout from '../../authentication/Logout';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';



export default function Dashboard() {

  let navigate = useNavigate();
  const { token } = useUser();
  const [validateUser, setValidateUser] = useState();

  return (
    <>
      <div className="container" >
        <form onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.target);
          navigate(`/vieworder/${data.get("orderId")}`)
        }}>

          <div className="mb-3">
            <label htmlFor="orderId" className="form-label">Enter order id here</label>
            <input type="number" className="form-control" name="orderId" id="orderId" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <p id='validateUser'>{validateUser}</p>
        </form>
      </div>
    </>
  );
}
