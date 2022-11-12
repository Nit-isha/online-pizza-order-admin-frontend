import React, { useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from "../../hooks/useUser";
import "./CustomerData.css";

export default function CustomerData() {
    
  const [customer, setCustomer] = useState([]);
  const { token } = useUser();
  const { custId } = useParams();
  let navigate = useNavigate();
  const [validateUser, setValidateUser] = useState();

  useEffect(() => {
      fetch(`http://localhost:9001/customer/${custId}`, {
          method: "GET",
          headers: {
              "content-type": "application/json",
              "Authorization": "Bearer " + token
          }
      })

        .then(res => {
            if (!res.ok) {
                throw Error("Customer is not in database");
            }
            else {
                return res.json();
            }
          })
        .then(json => {
            setCustomer(json)
        }).catch(err => setValidateUser(err.message))
  }, [])

        const { customerName, customerMobile, customerEmail, customerAddress,username } = customer;

  return (
      <>
          <button className='btn btn-primary mx-2 my-2' onClick={() => navigate("/viewallorders")}>Back</button>
          <section className="intro">
              <div className="gradient-custom-1 h-100">
                  <div className="mask d-flex align-items-center h-100">
                      <div className="container">
                          <div className="row justify-content-center">
                              <div className="col-12">
                                  <div className="table-responsive bg-white">
                                      <table className="table mb-0">
                                          <thead>
                                              <tr>
                                                  <th scope="col">NAME</th>
                                                  <th scope="col">CONTACT</th>
                                                  <th scope="col">EMAIL</th>
                                                  <th scope="col">ADDRESS</th>
                                                  <th scope="col">USERNAME</th>
                                              </tr>
                                          </thead>
                                                <tbody className='tablebody'>
                                                    <tr>
                                                        <th scope="row" >{customerName}</th>
                                                        <td>{customerMobile}</td>
                                                        <td>{customerEmail}</td>
                                                        <td>{customerAddress}</td>
                                                        <td>{username}</td>
                                                    </tr>
                                                </tbody>     
                                      </table>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      </>
  )
}
