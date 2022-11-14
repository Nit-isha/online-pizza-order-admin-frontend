import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import '../../index.css';

export default function AddPizza() {
    const { token } = useUser();
    const [error, setError] = useState();
    let navigate = useNavigate();

    return (
        <div className="container my-3">
            <h1 > Enter Pizza Details</h1>
            {token &&
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const data = new FormData(e.target); //Create actual data from form element

                        fetch("http://localhost:9001/addpizza", {
                            method: "POST",
                            body: JSON.stringify({
                                "pizzaType": data.get("pizzaType"),
                                "pizzaName": data.get("pizzaName"),
                                "pizzaSize": data.get("pizzaSize"),
                                "pizzaDescription": data.get("pizzaDesc"),
                                "pizzaCost": data.get("pizzaCost")
                            }),
                            headers: {
                                "content-type": "application/json",
                                "Authorization": "Bearer " + token
                            },
                        })
                            .then(async res => {
                                if (res.ok) {
                                    navigate("/menu");
                                }
                                else {
                                    const error = await res.json();
                                    throw Error(error.msg);
                                }
                            })
                            .catch(err => setError(err.message));
                    }}
                >
                   
                    <div className="form-group row ">
                        <label htmlFor="pizzaType" className="col-sm-2 col-form-label">Pizza type</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control-plaintext" style={{border:"solid 1px black"}}name="pizzaType" id="pizzaType" placeholder="Enter pizza type" autoFocus required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="pizzaName">Pizza Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control-plaintext" style={{border:"solid 1px black"}} name="pizzaName" id="pizzaName" placeholder='Enter pizza name' required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="pizzaSize">Pizza Size</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control-plaintext" style={{border:"solid 1px black"}}  name="pizzaSize" id="pizzaSize" placeholder='Enter pizza size'  required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="pizzaDesc">Pizza Description</label>
                        <div className="col-sm-10">
                            <textarea rows={3} className="form-control-plaintext" style={{border:"solid 1px black"}} type="text" name="pizzaDesc" id="pizzaDesc" placeholder='Enter pizza description' required />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="pizzaCost">Pizza Cost</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control-plaintext" style={{border:"solid 1px black"}} name="pizzaCost" id="pizzaCost" placeholder='Enter pizza cost' required/>
                        </div>
                    </div>
                    <input type="submit" className='btn btn-success btn-lg btn-block mx-2 my-1' value="Add" />
                    <input type="button" className='btn btn-default btn-lg btn-block mx-2 my-1' onClick={() => navigate("/menu")} value="Cancel" />
                    <p id="error">{error}</p>
                </form>

            }
        </div>
    )
}

