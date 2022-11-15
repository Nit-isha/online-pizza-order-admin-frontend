import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import "./PizzaListData.css";

export default function PizzaData(props) {
    const location = useLocation();
    const { id, pList, cName } = location.state;


    return (
        <>
            <section className="intro">
                <div className="gradient-custom-1 h-100">
                    <div className="mask d-flex align-items-center h-100">
                        <div className="container">
                            <h3 className="text-center text-light mt-5">Pizza Details</h3>
                            <div className="row justify-content-center">
                                <div className="col-12">
                                    <div className="table-responsive bg-white">
                                        <table className="table mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Pizza Name</th>
                                                    <th scope="col">Pizza Type</th>
                                                    <th scope="col">Pizza Size</th>
                                                    <th scope="col">Pizza Description</th>
                                                    <th scope="col">Pizza Cost</th>
                                                </tr>
                                            </thead>
                                            {
                                                pList.map((pizza) => {
                                                    const { pizzaType, pizzaName, pizzaSize, pizzaDescription, pizzaCost } = pizza;
                                                    console.log(pizza);
                                                    return (
                                                        <tbody className='tablebody'>
                                                            <tr>
                                                                <td>{pizzaName}</td>
                                                                <td>{pizzaType}</td>
                                                                <td>{pizzaSize}</td>
                                                                <td>{pizzaDescription}</td>
                                                                <td>{pizzaCost}</td>
                                                            </tr>
                                                        </tbody>
                                                    )
                                                })
                                            }
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}