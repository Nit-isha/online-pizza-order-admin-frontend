import React, { useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from "../../hooks/useUser";
import "./CustomerData.css";

export default function PizzaData() {
    
  const [pizza, setPizza] = useState([]);
  const { token } = useUser();
  const { pizzaId } = useParams();
  let navigate = useNavigate();
  const [validateUser, setValidateUser] = useState();

  
  useEffect(() => {
      fetch(`http://localhost:9001/menu/${pizzaId}`, {
          method: "GET",
          headers: {
              "content-type": "application/json",
              "Authorization": "Bearer " + token
          }
      })

        .then(res => {
            if (!res.ok) {
                throw Error("Pizza not found in database");
            }
            else {
                return res.json();
            }
          })
        .then(json => {
            setPizza(json)
        }).catch(err => setValidateUser(err.message))
  }, [])

        const { pizzaID, pizzaType, pizzaName, pizzaSize, pizzaDescription, pizzaCost } = pizza;

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
                                                  <th scope="col">ID</th>
                                                  <th scope="col">TYPE</th>
                                                  <th scope="col">NAME</th>
                                                  <th scope="col">SIZE</th>
                                                  <th scope="col">DESCRIPTION</th>
                                                  <th scope="col">COST</th>
                                              </tr>
                                          </thead>
                                                <tbody className='tablebody'>
                                                    <tr>
                                                        <th scope="row" >{pizzaId}</th>
                                                        <td>{pizzaType}</td>
                                                        <td>{pizzaName}</td>
                                                        <td>{pizzaSize}</td>
                                                        <td>{pizzaDescription}</td>
                                                        <td>{pizzaCost}</td>
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
