import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useUser } from "../../hooks/useUser";

export default function Menu() {
    const [menu, setmenu] = useState([]);
    const [cart, setCart] = useLocalStorage("cart", []);
    const [filter, setFilter] = useState();
    const [filterType, setFilterType] = useState();
    const { token } = useUser();
    let navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:9001/menu", { method: "GET" })
            .then((res) => res.json())
            .then((json) => {
                setmenu(json)
            })
    }, [])

    console.log(menu);

    const filteredPizza = menu.filter((pizza) => {
        if (!filter || filter === "none") {
            return true;
        }
        if (pizza.pizzaCost >= parseInt(filter.split("_")[0]) && pizza.pizzaCost < parseInt(filter.split("_")[1])) {
            return true;
        }
    }).filter((pizza) => {
        if (pizza.pizzaType === filterType) { return true }
        if (!filterType || filterType === "none") { return true }
    })

    return (
        <>
            <button className='addPizza btn btn-primary mx-2 my-2' onClick={() => navigate("/addpizza")}>Add Pizza</button>


            <div className='container my-3 text-center'>
                <h1>Menu</h1>
            </div>
            <div className="container my-3 text-center">
                {
                    <>
                        <form>
                            <label for="filterByCost">Filter by Price: </label>
                            <select name="filterByCost" className="mx-2 my-2" id="filterByCost" onChange={(e) => setFilter(e.target.value)} value={filter}>
                                <option value="none">All</option>
                                <option value="0_300">below 300</option>
                                <option value="300_600">300 - 600</option>
                                <option value="600_900">600 - 900</option>
                                <option value="900_2000">900 and above</option>
                            </select>

                            <label for="filterByType">Filter by Type: </label>
                            <select name="filterByType" className="mx-2 my-2"  id="filterByType" onChange={(e) => setFilterType(e.target.value)} value={filterType}>
                                <option value="none">All</option>
                                <option value="Veg">Veg</option>
                                <option value="Non-Veg">Non-Veg</option>
                            </select>
                        </form>
                    </>
                }
            </div>
            <div className="container">
                <div className='row'>
                    {
                        filteredPizza.map((pizza) => {
                            const { pizzaId, pizzaType, pizzaName, pizzaSize, pizzaDescription, pizzaCost } = pizza;
                            return (
                                <>
                                    <div className='col-md-3 mx-3 my-2'>
                                        <article key={pizzaId}>
                                            <div className="card" style={{ width: "18rem" }}>
                                                <div className="card-body">
                                                    <h5 className="card-title">{pizzaName}</h5>
                                                    <p className="card-text">Id : {pizzaId}</p>
                                                    <p className="card-text">Type : {pizzaType}</p>
                                                    <p className="card-text"> Size : {pizzaSize}</p>
                                                    <p className="card-text">Amount : {pizzaCost}</p>
                                                    <p className="card-text">Description : {pizzaDescription}</p>
                                                    <button className='btn btn-success mx-2' id={pizzaId} onClick={() => navigate(`/menu/update/${pizzaId}`)}>Update</button>
                                                    <button className='btn btn-danger mx-2' id={pizzaId} onClick={() => {
                                                        if (window.confirm("Are you sure") == true) {
                                                            navigate(`/menu/delete/${pizzaId}`);
                                                        } else {
                                                            navigate(`/menu`);
                                                        }
                                                    }
                                                    }>Delete</button>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
