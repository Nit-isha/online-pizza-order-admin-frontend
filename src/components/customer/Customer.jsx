import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../hooks/useUser";
import "./Customer.css";

export default function Customer() {
    const [customers, setCustomers] = useState([]);
    const { token } = useUser();
    let navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9001/customer", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + token
            }
        })

            .then((res) => res.json())
            .then((json) => {
                setCustomers(json)
            })
    }, [])


    return (
        <>
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
                                            {
                                                customers.map((customer) => {
                                                    const { customerName, customerMobile, customerEmail, customerAddress,username } = customer;
                                                    return (
                                                        <tbody className='tablebody'>
                                                            <tr>
                                                                <th scope="row" >{customerName}</th>
                                                                <td>{customerMobile}</td>
                                                                <td>{customerEmail}</td>
                                                                <td>{customerAddress}</td>
                                                                <td>{username}</td>
                                                            </tr>
                                                        </tbody>
                                                    )
                                                })
                                            }
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
