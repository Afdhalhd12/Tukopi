import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Template from "../Template";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import OrderHistory from "../pages/OrderHistory";
import EditProfile from "../pages/EditProfile";
import ProductList from "../pages/ProductList";
import DetailProduct from "../pages/DetailProduct";
import Address from "../pages/Address";
import CreateAddress from "../pages/CreateAddress";
import EditAddress from "../pages/EditAddress";
import CheckOut from "../pages/CheckOut";
import Dashboard from "../pages/admin/Dashboard";
import UserManagement from "../pages/admin/UserManagement";
import UpdateUser from "../pages/admin/UpdateUser";
import ProductManagement from "../pages/admin/ProductManagement";
import UpdateProduct from "../pages/admin/UpdateProduct";
import StockManagement from "../pages/admin/StockManagement";
import CreateProductSize from "../pages/admin/CreateProductSize";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Template />,
        // Mengisi outlet
        children: [
            { path: "/", element: <App /> },
            { path: "/profile", element: <Profile /> },
            { path: "/orderhistory", element: <OrderHistory /> },
            { path: "/editprofile", element: <EditProfile /> },
            { path: "/address", element: <Address /> },
            { path: "/createaddress", element: <CreateAddress /> },
            { path: "/editaddress/:id", element: <EditAddress /> },
            { path: "/productlist", element: <ProductList /> },
            { path: "/product/:id", element: <DetailProduct /> },
            { path: "/checkout/", element: <CheckOut /> },
            { path: "/admin/dashboard", element: <Dashboard/> },
            { path: "/admin/usermanagement", element: <UserManagement/> },
            { path: "/admin/productmanagement", element: <ProductManagement/> },
            { path: "/admin/updateproduct/:id", element: <UpdateProduct/> },
            { path: "/admin/updateuser/:id", element: <UpdateUser/> },
            { path: "/admin/productmanagement/:id/stock", element: <StockManagement/> },
            { path: "/admin/productmanagement/:id/ProductSize", element: <CreateProductSize/> },
        ]
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/login",
        element: <Login />,
    },
])