import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from "../../hooks/useUser";
import "./Customer.css";

export default function CustomerData(props) {
    const [customer, setCustomer] = useState([]);
    const { token } = useUser();
    const location = useLocation();
    const { id, pList, cName } = location.state;
    const [validateUser, setValidateUser] = useState();
    let navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:9001/customer/${id}`, {
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

    const { customerName, customerMobile, customerEmail, customerAddress, username } = customer;
    return (
        <>
            <section className="intro">
                <div className="gradient-custom-1 h-100">
                    <div className="mask d-flex align-items-center h-100">
                        <div className="container">
                            <h3 className="text-center text-light mt-5">Customer Details</h3>
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
