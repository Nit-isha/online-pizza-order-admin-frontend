import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import usePizzaInfo from '../../hooks/usePizzaInfo';
import '../../index.css';

export default function UpdatePizza() {
    let navigate = useNavigate();
    const { pizzaId } = useParams();
    const { token } = useUser();
    const info = usePizzaInfo(pizzaId);

    return (
            <div className='container my-3'>
                <h1 >Update Pizza Information</h1>
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


                    <div className="form-group row ">
                        <label htmlFor="pizzaType" className="col-sm-2 col-form-label">Pizza type</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control-plaintext" style={{border:"solid 1px black"}}name="pizzaType" id="pizzaType" defaultValue={info?.pizzaType} placeholder="Enter pizza type" required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="pizzaName">Pizza Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control-plaintext" style={{border:"solid 1px black"}} name="pizzaName" id="pizzaName" defaultValue={info?.pizzaName} placeholder='Enter pizza name' required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="pizzaSize">Pizza Size</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control-plaintext" style={{border:"solid 1px black"}}  name="pizzaSize" id="pizzaSize" defaultValue={info?.pizzaSize} placeholder='Enter pizza size'  required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="pizzaDesc">Pizza Description</label>
                        <div className="col-sm-10">
                            <textarea rows={3} className="form-control-plaintext" style={{border:"solid 1px black"}} type="text" name="pizzaDesc" id="pizzaDesc" defaultValue={info?.pizzaDescription} placeholder='Enter pizza description' required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="pizzaCost">Pizza Cost</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control-plaintext" style={{border:"solid 1px black"}} name="pizzaCost" id="pizzaCost" defaultValue={info?.pizzaCost} placeholder='Enter pizza cost' required/>
                        </div>
                    </div>
                    <input type="submit" className="btn btn-success btn-lg btn-block mx-2 my-2" value="Update" />
                        <input type="button" className="btn btn-default btn-lg btn-block mx-2 my-2" value="Cancel" onClick={() => navigate("/menu")} />
                    
                    </form>
                }
            </div>
        </div>
    )
}
