import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

export default function AddCoupon() {
    const { token } = useUser();
    const [error, setError] = useState();
    let navigate = useNavigate();

    return (
        <div className="container text-center my-3">
            {token &&
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const data = new FormData(e.target); //Create actual data from form element

                        fetch("http://localhost:9001/addcoupon", {
                            method: "POST",
                            body: JSON.stringify({
                                "couponType": data.get("couponType"),
                                "couponName": data.get("couponName"),
                                "amount": data.get("amount"),
                                "couponDescription": data.get("couponDesc"),
                                "discount": data.get("discount")
                            }),
                            headers: {
                                "content-type": "application/json",
                                "Authorization": "Bearer " + token
                            },
                        })
                            .then(async res => {
                                if (res.ok) {
                                    navigate("/coupon");
                                }
                                else {
                                    const error = await res.json();
                                    throw Error(error.msg);
                                }
                            })
                            .catch(err => setError(err.message));
                    }}
                >

                    <div className="form-group row ">
                        <label htmlFor="pizzaType" className="col-sm-2 col-form-label">Coupon Name</label>
                        <select name="couponType" id="couponType" className="mx-3">
                            <option value="FLAT">FLAT</option>
                            <option value="PERCENTAGE">PERCENTAGE</option>
                        </select>
                    </div>
                    <div className="form-group row ">
                        <label htmlFor="pizzaType" className="col-sm-2 col-form-label">Coupon Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control-plaintext" style={{ border: "solid 1px black" }} name="couponName" id="couponName" placeholder="Enter coupon name" required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="pizzaName">Amount</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control-plaintext" style={{ border: "solid 1px black" }} name="amount" id="amount" placeholder="Enter min order value(for FLAT) / max discount(for PERCENTAGE)." required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="pizzaSize">Discount</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control-plaintext" style={{ border: "solid 1px black" }} name="discount" id="discount" placeholder="Enter discount value(percentage/amount)." required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="pizzaDesc">Coupon Description</label>
                        <div className="col-sm-10">
                            <textarea rows={3} className="form-control-plaintext" style={{ border: "solid 1px black" }} type="text" name="couponDesc" id="couponDesc" placeholder="Enter coupon description." required />
                        </div>
                    </div>
                    <input type="submit" className='btn btn-success mx-2 my-1' value="Add" />
                    <input type="button" className='btn btn-default mx-2 my-1' onClick={() => navigate("/coupon")} value="Cancel" />
                    <p id="error">{error}</p>
                </form>
            }
        </div>
    )
}

