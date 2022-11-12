import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../hooks/useUser";
import "./AllOrders.css";

export default function AllOrders(props) {
    const [orders, setOrders] = useState([]);
    const { token } = useUser();
    let navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9001/allorders", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + token
            }
        })

            .then((res) => res.json())
            .then((json) => {
                setOrders(json)
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
                                                    <th scope="col">BOOKING ID</th>
                                                    <th scope="col">DATE</th>
                                                    <th scope="col">TRANSACTION</th>
                                                    <th scope="col">COST</th>
                                                    <th scope="col">COUPON</th>
                                                    <th scope="col">TYPE</th>
                                                    <th scope="col">CUSTOMER ID</th>
                                                    <th colSpan={props.maxQuantity} scope="col">PIZZA LIST</th>
                                                </tr>
                                            </thead>
                                            {
                                                orders.map((order) => {
                                                    const { bookingOrderId, orderDate, transactionMode,quantity,totalCost,couponName,orderType,custId,pizzaList} = order;
                                                    
                                                    return (
                                                        <tbody className='tablebody'>
                                                            <tr>
                                                                <th scope="row" >{bookingOrderId}</th>
                                                                <td>{orderDate}</td>
                                                                <td>{transactionMode}</td>
                                                                <td>{totalCost}</td>
                                                                <td>{couponName}</td>
                                                                <td>{orderType}</td>
                                                                <td><button className="btn btn-primary mx-2 btn-sm" id={custId} onClick={() => navigate(`/viewcustomerdetails/${custId}`)}>{custId}</button></td>
                                                                {
                                                                    pizzaList.map((pizza)=> {
                                                                        const { pizzaId, pizzaType, pizzaName, pizzaSize, pizzaDescription, pizzaCost } = pizza;
                                                                        return (
                                                                            <>
                                                                                <td>{pizzaId}</td>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
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
