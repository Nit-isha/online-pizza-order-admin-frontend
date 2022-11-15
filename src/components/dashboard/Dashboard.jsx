import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUser } from '../../hooks/useUser';




export default function Dashboard() {

  let navigate = useNavigate();
  const [error, setError] = useState();
  const { token } = useUser();


  return (
    <>
      <div className="container my-4" >
        <div className="card">
          <div className="card-body">
            <h3 className="card-title" style={{ textAlign: "center" }}>Search Order By Id</h3>
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
                      toast.error("Order not found in database");
                      throw Error("Order not found in database");
                    }
                    else {
                      navigate(`/vieworder/${data.get("orderId")}`)
                    }
                  }).catch(err => setError(err))

              }}>

                <div className="form-group row ">
                  <label htmlFor="orderId" className="col-sm-2 col-form-label">Enter Order Id here:</label>
                  <div className="col-sm-10">
                    <input type="number" className="form-control-plaintext" style={{ border: "solid 1px black" }} name="orderId" id="orderId" placeholder="Enter Order Id" autoFocus required />
                    <button type="submit" className="btn btn-primary btn-lg my-3 mx-2">Submit</button>
                    <button type="reset" className="btn btn-default btn-lg my-3 mx-2">Reset</button>
                    {/* <p id='error'>{error}</p> */}
                  </div>
                </div>
              </form>
            </p>
          </div>
        </div>
      </div>

      <div className="container my-4" >
        <div className="card">
          <div className="card-body">
            <h3 className="card-title" style={{ textAlign: "center" }}>Search Customer By Username</h3>
            <p className="card-text">
              <form onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.target);
                fetch(`http://localhost:9001/customer/search?uname=${data.get("uname")}`, {
                  method: "GET",
                  headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + token
                  }
                })

                  .then(res => {
                    if (!res.ok) {
                      toast.error("username not found in database");
                      throw Error("Customer not found in database");
                    }
                    else {
                      navigate(`/viewcustomer/${data.get("uname")}`)
                    }
                  }).catch(err => setError(err))

              }}>

                <div className="form-group row ">
                  <label htmlFor="uname" className="col-sm-2 col-form-label">Enter Customer Username Here:</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control-plaintext" style={{ border: "solid 1px black" }} name="uname" id="uname" placeholder="Enter username" required />
                    <button type="submit" className="btn btn-primary btn-lg my-3 mx-2">Submit</button>
                    <button type="reset" className="btn btn-default btn-lg my-3 mx-2">Reset</button>
                    {/* <p id='error'>{error}</p> */}
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
