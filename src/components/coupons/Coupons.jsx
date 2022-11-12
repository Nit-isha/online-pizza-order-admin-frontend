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
            <div>
                {
                    coupons.map((coupon) => {
                        const { couponId, couponName, couponType, discount,amount, couponDescription } = coupon;
                        return (
                            <>
                                <article key={couponId}>
                                    <div className="couponid">{couponId}</div>
                                    <div className="coupontype">{couponType}</div>
                                    <div className="couponname">{couponName}</div>
                                    <div className="discount">{discount}</div>
                                    <div className="coupondesc">{couponDescription}</div>
                                    <div className="amount">{amount}</div>
                                    <button className='update mx-2' id={couponId} onClick={() => navigate(`/coupon/update/${couponId}`)}>Update</button>
                                    <button className='delete mx-2' id={couponId} onClick={() => {
                                        if (window.confirm("Are you sure") == true) {
                                            navigate(`/coupon/delete/${couponId}`);
                                        } else {
                                            navigate(`/coupon`);
                                        }
                                    }
                                    }>Delete</button>
                                    <br />
                                    <br />
                                </article>
                            </>
                        )
                    })
                }
            </div>
            <br />
        </>
    )
}
