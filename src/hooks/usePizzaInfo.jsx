import { useEffect, useState } from "react";
import { useUser } from "./useUser";

export default function usePizzaInfo(id) {
    const [pizzaInfo, setPizzaInfo] = useState({});
    const { token } = useUser();

    useEffect(() => {
        fetch(`http://localhost:9001/menu/${id}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((res) => res.json())
            .then((json) => setPizzaInfo(json))

    }, [token])

    return pizzaInfo;
}
