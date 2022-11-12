import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import usePizzaInfo from '../../hooks/usePizzaInfo';

export default function UpdatePizza() {
    let navigate = useNavigate();
    const { pizzaId } = useParams();
    const { token } = useUser();
    const info = usePizzaInfo(pizzaId);

    return (
            <div className='container my-3'>
                <h1>Update Pizza Information</h1>
            <div className="update">
                {
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const data = new FormData(e.target);

                        fetch(`http://localhost:9001/menu/${pizzaId}`, {
                            method: "PUT",
                            headers: {
                                "content-type": "application/json",
                                "Accept": "application/json",
                                "Authorization": "Bearer " + token
                            },
                            body: JSON.stringify({
                                "pizzaType": data.get("pizzaType"),
                                "pizzaName": data.get("pizzaName"),
                                "pizzaSize": data.get("pizzaSize"),
                                "pizzaDescription": data.get("pizzaDesc"),
                                "pizzaCost": data.get("pizzaCost")
                            }),

                        }).then(() => navigate("/menu"))
                    }}>

                        <label htmlFor="pizzaType">Pizza Type</label>
                        <input type="text" name="pizzaType" id="pizzaType" defaultValue={info?.pizzaType} required autoFocus />
                        <br />
                        <label htmlFor="pizzaName">Pizza Name</label>
                        <input type="text" name="pizzaName" id="pizzaName" defaultValue={info?.pizzaName} required />
                        <br />
                        <label htmlFor="pizzaSize">Pizza Size</label>
                        <input type="text" name="pizzaSize" id="pizzaSize" defaultValue={info?.pizzaSize} required />
                        <br />
                        <label htmlFor="pizzaDesc">Pizza Description</label>
                        <input type="text" name="pizzaDesc" id="pizzaDesc" defaultValue={info?.pizzaDescription} required />
                        <br />
                        <label htmlFor="pizzaCost">Pizza Cost</label>
                        <input type="number" name="pizzaCost" id="pizzaCost" defaultValue={info?.pizzaCost} required />
                        <br />
                        <input type="submit" className="btn btn-success mx-2 my-2" value="Update" />
                        <input type="button" className="btn btn-default mx-2 my-2" value="Cancel" onClick={() => navigate("/menu")} />
                    </form>
                }
            </div>
        </div>
    )
}
