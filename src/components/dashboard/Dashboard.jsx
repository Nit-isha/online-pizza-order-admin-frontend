import React, { useState, useEffect } from 'react'
import Logout from '../../authentication/Logout';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Dashboard() {

  let navigate = useNavigate();
  const [error, setError] = useState();
  const { token } = useUser();
  const [validateUser, setValidateUser] = useState();

  const notify = () => toast.error("Order not found in database");

  return (
    <>
      <div className="container my-4" >
      <div className="card">
        <div className="card-body">
          <h3 className="card-title" style={{textAlign:"center"}}>Search Order By Id</h3>
          <p className="card-text">
              <form onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.target);
                  fetch(`http://localhost:9001/allorders/${data.get("orderId")}`, {
                      method: "GET",
                      headers: {
                          "content-type": "application/json",
                          "Authorization": "Bearer " + token
                      }
                  })
          
                      .then(res => {
                          if (!res.ok) {
                              throw Error("Order not found in database");
                          }
                          else {
                            navigate(`/vieworder/${data.get("orderId")}`)
                          }
                      }).catch(err => setError(notify))
                
              }}>

                  <div className="form-group row ">
                      <label htmlFor="orderId" className="col-sm-2 col-form-label">Enter Order Id here:</label>
                      <div className="col-sm-10">
                          <input type="number" className="form-control-plaintext" style={{border:"solid 1px black"}}name="orderId" id="orderId" placeholder="Enter Order Id" autoFocus required/>
                          <button type="submit" className="btn btn-primary my-3">Submit</button>
                      {/* <p id='error'>{error}</p> */}
                          <ToastContainer />
                          </div>
                  </div>
              </form>
        </p>
        </div>
        </div>
      </div>
    </>
  );
}
