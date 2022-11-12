import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../hooks/useUser";

export default function Coupons() {
    const [coupons, setCoupons] = useState([]);
    const { token } = useUser();
    let navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9001/coupon", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + token
            }
        })

            .then((res) => res.json())
            .then((json) => {
                setCoupons(json)
            })
    }, [])


    return (
        <>
            <button className='btn btn-primary mx-2 my-2' onClick={() => navigate("/addcoupon")}>Add Coupon</button>
            <div className='container my-3'>
                <div className='row'>
                    
                        {
                            coupons.map((coupon) => {
                                const { couponId, couponName, couponType, discount, amount, couponDescription } = coupon;
                                return (
                                    <>
                                    <div className='col-md-3 mx-4 my-2'>
                                        <article key={couponId}>

                                            <div className="card" style={{ width: "18rem" }}>
                                                <div className="card-body">
                                                    <h5 className="card-title">{couponName}</h5>
                                                    <p className="card-text">Id : {couponId}</p>
                                                    <p className="card-text">Type : {couponType}</p>
                                                    <p className="card-text"> Discount : {discount}</p>
                                                    <p className="card-text">Amount : {amount}</p>
                                                    <p className="card-text">Discount : {discount}</p>
                                                    <p className="card-text">Description : {couponDescription}</p>
                                                    <button className='btn btn-success my-1 mx-2' id={couponId} onClick={() => navigate(`/coupon/update/${couponId}`)}>Update</button>
                                                    <button className='btn btn-danger my-1 mx-2' id={couponId} onClick={() => {
                                                        if (window.confirm("Are you sure") == true) {
                                                            navigate(`/coupon/delete/${couponId}`);
                                                        } else {
                                                            navigate(`/coupon`);
                                                        }
                                                    }
                                                    }>Delete</button>
                                                </div>
                                            </div>

                                        </article>
                                        </div>
                                    </>
                                )
                            })
                        }
                </div>
            </div>
            <br />
        </>
    )
}
