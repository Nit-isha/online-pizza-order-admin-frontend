import { useEffect, useState } from "react";
import { useUser } from "./useUser";

export default function useUserInfo(custId) {
    const [userInfo, setUserInfo] = useState({});
    const { token } = useUser();

    useEffect(() => {
        fetch(`http://localhost:9001/customer/${custId}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((res) => res.json())
            .then((json) => setUserInfo(json))

    }, [token])

    return userInfo;
}
