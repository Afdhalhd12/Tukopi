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
import AdminRoute from "../components/AdminRoute";
import CreateProduct from "../pages/admin/CreateProduct";
import DetailOrderHistory from "../pages/DetailOrderHistory";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Template />,
        children: [
            { path: "/", element: <App /> },
            { path: "/profile", element: <Profile /> },
            { path: "/orderhistory", element: <OrderHistory /> },
            { path: "/orderhistory/:id", element: <DetailOrderHistory/> },
            { path: "/editprofile", element: <EditProfile /> },
            { path: "/address", element: <Address /> },
            { path: "/createaddress", element: <CreateAddress /> },
            { path: "/editaddress/:id", element: <EditAddress /> },
            { path: "/productlist", element: <ProductList /> },
            { path: "/product/:id", element: <DetailProduct /> },
            { path: "/checkout", element: <CheckOut /> },

        //    Khusus admindd
            {
                path: "/admin",
                element: <AdminRoute />,
                children: [
                    {
                        path: "dashboard",
                        element: <Dashboard />,
                    },
                    {
                        path: "usermanagement",
                        element: <UserManagement />,
                    },
                    {
                        path: "productmanagement",
                        element: <ProductManagement />,
                    },
                    {
                        path: "createproduct",
                        element: <CreateProduct/>,
                    },
                    {
                        path: "updateproduct/:id",
                        element: <UpdateProduct />,
                    },
                    {
                        path: "updateuser/:id",
                        element: <UpdateUser />,
                    },
                    {
                        path: "productmanagement/:id/stock",
                        element: <StockManagement />,
                    },
                    {
                        path: "productmanagement/:id/ProductSize",
                        element: <CreateProductSize />,
                    },
                ],
            },
        ],
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/login",
        element: <Login />,
    },
]);