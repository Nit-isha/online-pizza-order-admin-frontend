import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUser } from "../../hooks/useUser";
import "./AllOrders.css";


export default function OrderById() {

    const [order, setOrder] = useState([]);
    const { token } = useUser();
    const { orderId } = useParams();
    const [id, pList, cname] = useState({});
    let navigate = useNavigate();
    const [validateUser, setValidateUser] = useState();
    const [error, setError] = useState();

    // ----------Fetching specific order details---------------

    useEffect(() => {
        fetch(`http://localhost:9001/allorders/${orderId}`, {
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
                    return res.json();
                }
            })
            .then(json => {
                setOrder(json)
            }).catch(err => setError(err.message))
    }, [])

    const { bookingOrderId, orderDate, transactionMode, quantity, totalCost, couponName, orderType, custId, pizzaList } = order;

    return (
        <>
            <button className='btn btn-primary mx-2 my-2' onClick={() => navigate("/dashboard")}>Back</button>
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
                                                    <th scope="col">BOOKING ID</th>
                                                    <th scope="col">DATE</th>
                                                    <th scope="col">TRANSACTION</th>
                                                    <th scope="col">COUPON</th>
                                                    <th scope="col">AMOUNT</th>
                                                    <th scope="col">TYPE</th>
                                                    <th scope="col">CUSTOMER ID</th>
                                                </tr>
                                            </thead>
                                            <tbody className='tablebody'>
                                                <tr>
                                                    <td><Link to="/vieworderdetails" state={{ id: custId, pList: pizzaList, cName: couponName }}>{bookingOrderId}</Link></td>
                                                    <td>{orderDate}</td>
                                                    <td>{transactionMode}</td>
                                                    <td>{couponName}</td>
                                                    <td>{totalCost}</td>
                                                    <td>{orderType}</td>
                                                    <td>{custId}</td>
                                                </tr>
                                            </tbody>
                                            <p id="error">{error}</p>
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