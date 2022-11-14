import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import useCouponInfo from '../../hooks/useCouponInfo';

export default function UpdateCoupon() {
    let navigate = useNavigate();
    const { couponId } = useParams();
    const { token } = useUser();
    const info = useCouponInfo(couponId);
    const [type, setType] = useState()

    return (
        <>
            <div className="container my-3 ">
                <h1>Update coupon Information</h1>
                {
                    <form onSubmit={(e) => {
                        e.preventDefault();
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

                        {/* <label htmlFor="couponType">Coupon Type</label>
                    <select name="couponType" id="couponType" onChange={(e)=>setType(e.target.value)} value={type}>
                        <option value="FLAT">FLAT</option>
                        <option value="PERCENTAGE">PERCENTAGE</option>
                    </select>
                    {console.log(type)}
                    <br />
                    <label htmlFor="couponName">Coupon Name</label>
                    <input type="text" name="couponName" className="form-control" id="couponName" defaultValue={info?.couponName} required />
                    <br />
                    <label htmlFor="amount">Amount</label>
                    <input type="number" name="amount" className="form-control" id="amount"  defaultValue={info?.amount} required />
                    <br />
                    <label htmlFor="discount">Discount</label>
                    <input type="number" name="discount" className="form-control" id="discount" defaultValue={info?.discount} required />
                    <br />
                    <label htmlFor="couponDesc">Coupon Description</label>
                    <textarea rows={3} type="text" name="couponDesc" className="form-control" id="couponDesc" defaultValue={info?.couponDescription} required />
                    <br />
                        <input type="submit" value="Update" className='btn btn-success' />
                        <input type="button" value="Cancel"  className='btn btn-default' onClick={() => navigate("/coupon")} /> */}

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
                        <input type="submit" className='btn btn-success mx-2 my-1' value="Add" />
                        <input type="button" className='btn btn-default mx-2 my-1' onClick={() => navigate("/coupon")} value="Cancel" />
                    </form>
                }
            </div>
        </>
    )
}
