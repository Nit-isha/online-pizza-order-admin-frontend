//import { RouterProvider } from "react-router-dom";
import NavBar from "./components/navbar/Navbar";
// import createBrowserRouter from "./router/Router";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Menu from "./components/menu/Menu";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./authentication/Login";
import UpdatePizza from "./components/pizza/UpdatePizza";
import DeletePizza from "./components/pizza/DeletePizza";
import AddPizza from "./components/pizza/AddPizza";
import Coupons from "./components/coupons/Coupons";
import UpdateCoupon from "./components/coupons/UpdateCoupon";
import Customer from "./components/customer/Customer";
import AllOrders from "./components/orders/AllOrders";
import AddCoupon from "./components/coupons/AddCoupon";
import DeleteCoupon from "./components/coupons/DeleteCoupon";
import { useUser } from "./hooks/useUser";

function App() {
  const { token, logout } = useUser();
  return (
    <div>
        <Router>
        {token && <NavBar/>}
        
        <Routes>
        <Route path= "/" exact element= {<Login/>} />
        <Route path= "/menu" exact element= {<Menu/>} />
        <Route  path= "/dashboard" element={<Dashboard/>} />
        <Route path= "/login" element={<Login/>}/>
        <Route path="/menu/update/:pizzaId" element={<UpdatePizza />}  />
        <Route path= "/menu/delete/:pizzaId" element={<DeletePizza />} />
        <Route path="/addpizza" element={<AddPizza />}  />
        <Route path= "/coupon" element={<Coupons /> } />
        <Route path= "/coupon/update/:couponId" element= {<UpdateCoupon/>} />
        <Route path= "/coupon/delete/:couponId" element= {<DeleteCoupon/>} />
        <Route path= "/addcoupon" element= {<AddCoupon/>} />
        <Route path= "/viewcustomers" element= {<Customer/>} />
        <Route path= "/viewallorders" element= {<AllOrders/>} />
      </Routes>
        </Router>
      </div>
    // <RouterProvider router={createBrowserRouter} />
    
  )
}

export default App;
