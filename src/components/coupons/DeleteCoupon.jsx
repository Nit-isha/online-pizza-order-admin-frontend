
import  { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

export default function DeleteCoupon(){

    let navigate = useNavigate();
    const { couponId } = useParams();
    const { token } = useUser();

    useEffect(() => {
        fetch(`http://localhost:9001/coupon/${couponId}`, {
             method: "DELETE",
             headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + token
            },
            })
            .then(() => navigate("/coupon"))
    }, [])
}