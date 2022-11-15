import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { toast } from 'react-toastify';
import useCouponInfo from '../../hooks/useCouponInfo';
import '../../index.css';

export default function UpdateCoupon() {
    let navigate = useNavigate();
    const { couponId } = useParams();
    const { token } = useUser();
    const info = useCouponInfo(couponId);
    const [type, setType] = useState()

    return (
        <>
            <div className="container my-3 " style={{backgroundColor:"white"}}>
                <h1 > Update Coupon Details</h1>

                {
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        toast.success("coupon updated successfully..");
                        const data = new FormData(e.target);

                        fetch(`http://localhost:9001/coupon/${couponId}`, {
                            method: "PUT",
                            headers: {
                                "content-type": "application/json",
                                "Accept": "application/json",
                                "Authorization": "Bearer " + token
                            },
                            body: JSON.stringify({
                                "couponType": data.get("couponType"),
                                "couponName": data.get("couponName"),
                                "amount": data.get("amount"),
                                "couponDescription": data.get("couponDesc"),
                                "discount": data.get("discount")
                            }),

                        }).then(() => navigate("/coupon"))
                    }}>
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
                                <input type="text" className="form-control-plaintext" style={{ border: "solid 1px black" }} name="couponName" id="couponName" defaultValue={info?.couponName} placeholder="Enter coupon name" required />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label" htmlFor="pizzaName">Amount</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control-plaintext" style={{ border: "solid 1px black" }} name="amount" id="amount" defaultValue={info?.amount} placeholder="Enter min order value(for FLAT) / max discount(for PERCENTAGE)." required />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label" htmlFor="pizzaSize">Discount</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control-plaintext" style={{ border: "solid 1px black" }} name="discount" id="discount" defaultValue={info?.discount} placeholder="Enter discount value(percentage/amount)." required />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label" htmlFor="pizzaDesc">Coupon Description</label>
                            <div className="col-sm-10">
                                <textarea rows={3} className="form-control-plaintext" style={{ border: "solid 1px black" }} type="text" name="couponDesc" id="couponDesc" defaultValue={info?.couponDescription} placeholder="Enter coupon description." required />
                            </div>
                        </div>
                        <input type="submit" className='btn btn-success btn-lg btn-block mx-2 my-1' value="Add" />
                        <input type="button" className='btn btn-default btn-lg btn-block mx-2 my-1' onClick={() => navigate("/menu")} value="Cancel" />
                    </form>
                }
            </div>
        </>
    )
}
