import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useUser } from "../../hooks/useUser";
import "./Coupon.css";

export default function CouponData(props) {
    const [coupon, setCoupon] = useState([]);
    const { token } = useUser();
    const location = useLocation();
    const { id, pList, cName } = location.state;
    const [validateUser, setValidateUser] = useState();

    useEffect(() => {
        fetch(`http://localhost:9001/coupons/${cName}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw Error("Coupon is not in database");
                }
                else {
                    return res.json();
                }
            })
            .then(json => {
                setCoupon(json)
            }).catch(err => setValidateUser(err.message))
    }, [])

    const { couponId, couponName, couponType, discount, amount, couponDescription } = coupon;
    return (
        <>
            <section className="intro">
                <div className="gradient-custom-1 h-100">
                    <div className="mask d-flex align-items-center h-100">
                        <div className="container">
                            <h3 className="text-center text-light mt-5">Coupon Details</h3>
                            <div className="row justify-content-center">
                                <div className="col-12">
                                    <div className="table-responsive bg-white">
                                        <table className="table mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Coupon Id</th>
                                                    <th scope="col">Coupon Name</th>
                                                    <th scope="col">Coupon Type</th>
                                                    <th scope="col">Discount</th>
                                                    <th scope="col">Amount</th>
                                                    <th scope="col">Coupon Description</th>
                                                </tr>
                                            </thead>
                                            <tbody className='tablebody'>
                                                <tr>
                                                    <th scope="row" >{couponId}</th>
                                                    <td>{couponName}</td>
                                                    <td>{couponType}</td>
                                                    <td>{discount}</td>
                                                    <td>{amount}</td>
                                                    <td>{couponDescription}</td>
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
