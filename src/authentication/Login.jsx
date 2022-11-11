import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from "../hooks/useUser";
import './login.css';

export default function Login() {
    const { token, login } = useUser();
    const [validateUser, setValidateUser] = useState();
    let navigate = useNavigate();


    return (
        <div class="container">
            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <h2 class="text-center text-dark mt-5">Login Form</h2>
                    <div class="card my-5">
                        { !token && 
                            <form class="card-body cardbody-color p-lg-5"

                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const data = new FormData(e.target); //Create actual data from form element
                            
                                    fetch("http://localhost:9001/login", {
                                    method: "POST",
                                    body: JSON.stringify({
                                        username: data.get("Username"),
                                        password: data.get("password"),
                                    }),
                                    headers: {
                                        "content-type": "application/json",
                                    },
                                    })
                                    .then((res) => {
                                        if (!res.ok) {
                                            throw Error("Invalid Username or Password.");
                                        } else {
                                            return res.json();
                                        }
                                    })
                                    .then((res) => {
                                        login(res.token);
                                        navigate("/dashboard");
                                    })
                                    .catch((err) => setValidateUser(err.message));
                                }}
                            >
                                <div class="text-center">
                                    <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" className="img-fluid profile-image-pic    img-thumbnail rounded-circle my-3"
                                        width="200px" alt="profile" />
                                </div>

                                <div class="mb-3">
                                <input type="text" className="form-control" name='Username' id="Username" placeholder='username' required autoFocus />
                                </div>
                                <div class="mb-3">
                                <input type="password" className="form-control" name='password' id="password" placeholder="password" required />
                                </div>
                                <div class="text-center"><button type="submit" className="btn btn-color px-5 mb-5 w-100">Login</button></div>
                                <p id='validateUser'>{validateUser}</p>
                            </form>
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}
