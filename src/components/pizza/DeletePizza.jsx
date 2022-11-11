
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

export default function DeletePizza(){

    let navigate = useNavigate();
    const { pizzaId } = useParams();
    const { token } = useUser();

    useEffect(() => {
        fetch(`http://localhost:9001/menu/${pizzaId}`, {
             method: "DELETE",
             headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + token
            },
            })
            .then(() => navigate("/menu"))
    }, [])
}