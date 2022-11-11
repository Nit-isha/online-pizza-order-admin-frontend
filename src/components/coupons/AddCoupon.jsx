import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

export default function AddCoupon() {
    const { token } = useUser();
    const [error, setError] = useState();
    let navigate = useNavigate();

    return (
        <div className="align-items-center">
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
                    
                    <label htmlFor="couponType">Coupon Type</label>
                    {/* <input type="text" name="couponType" className="form-control" id="couponType"  required autoFocus /> */}
                    <select name="couponType" id="couponType">
                        <option value="FLAT">FLAT</option>
                        <option value="PERCENTAGE">PERCENTAGE</option>
                    </select>
                    <br />
                    <label htmlFor="couponName">Coupon Name</label>
                    <input type="text" name="couponName" className="form-control" id="couponName" required />
                    <br />
                    <label htmlFor="amount">Amount</label>
                    <input type="number" name="amount" className="form-control" id="amount"  required />
                    <br />
                    <label htmlFor="discount">Discount</label>
                    <input type="number" name="discount" className="form-control" id="discount"  required />
                    <br />
                    <label htmlFor="couponDesc">Coupon Description</label>
                    <textarea rows={3} type="text" name="couponDesc" className="form-control" id="couponDesc"  required />
                    <br />
                        
                    <input type="submit" className='btn btn-primary mx-2 my-1' value="Add" />
                    <input type="button" className='btn btn-primary mx-2 my-1' onClick={() => navigate("/coupon")} value="Cancel" />
                    <p id="error">{error}</p>
                </form>
            }
        </div>
    )
}

