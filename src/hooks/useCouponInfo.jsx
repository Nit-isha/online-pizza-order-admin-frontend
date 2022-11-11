import { useEffect, useState } from "react";
import { useUser } from "./useUser";

export default function useCouponInfo(id) {
    const [couponInfo, setCouponInfo] = useState({});
    const { token } = useUser();

    useEffect(() => {
        fetch(`http://localhost:9001/coupon/${id}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((res) => res.json())
            .then((json) => setCouponInfo(json))

    }, [token])

    return couponInfo;
}
