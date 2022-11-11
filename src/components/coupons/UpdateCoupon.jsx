import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import useCouponInfo from '../../hooks/useCouponInfo';

export default function UpdateCoupon() {
    let navigate = useNavigate();
    const { couponId } = useParams();
    const { token } = useUser();
    const info = useCouponInfo(couponId);
    const [type,setType] = useState()

    return (
        <>
            <div>Update coupon Information</div>
            <div className="update">
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

                    <label htmlFor="couponType">Coupon Type</label>
                    {/* <input type="text" name="couponType" className="form-control" id="couponType"  required autoFocus /> */}
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
                        <input type="submit" value="Update" />
                        <input type="button" value="Cancel" onClick={() => navigate("/coupon")} />
                    </form>
                }
            </div>
        </>
    )
}
