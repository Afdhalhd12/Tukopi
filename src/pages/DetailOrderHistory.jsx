import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SideBar from "../components/SideBar";
import ButtonComp from "../components/buttonComp";
import api from "../utils/API";
import red from "../assets/red.jpg";

export default function DetailOrderHistory() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    async function getOrders() {
        try {
            const response = await api.get(`/order/foruser/${id}`);
            setOrder(response.data.data);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

    useEffect(() => {
        getOrders();
    }, []);

    if (!order) {
        return (
            <div className="flex justify-center items-center min-h-screen font-inter">
                Loading...
            </div>
        );
    }

    return (
        <div className="bg-[#f8f8f8] min-h-screen">
            <div className="grid grid-cols-8">

                <div className="col-span-2">
                    <SideBar />
                </div>

                <div className="col-span-6 p-10 mt-10">

                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="font-oswald text-3xl">
                                Order Detail
                            </h1>

                            <p className="font-inter text-sm text-[#737373]">
                                Invoice #INV/{order.id}
                            </p>
                        </div>

                        <Link to="/orderhistory">
                            <ButtonComp
                                text="Kembali"
                                styling="rounded-full bg-black text-white px-6 py-2 font-inter"
                            />
                        </Link>
                    </div>

                    {/* Info */}
                    <div className="bg-white rounded-2xl shadow p-6 mt-6">

                        <div className="flex justify-between">

                            <div>
                                <p className="font-inter text-xs text-[#737373]">
                                    Order Date
                                </p>

                                <p className="font-inter font-medium">
                                    {new Date(order.orderDate).toLocaleDateString("id-ID")}
                                </p>
                            </div>

                            <div>
                                <p className="font-inter text-xs text-[#737373]">
                                    Total Item
                                </p>

                                <p className="font-inter font-medium">
                                    {order.items?.length} Product
                                </p>
                            </div>

                            <div>
                                <p className="font-inter text-xs text-[#737373]">
                                    Total Payment
                                </p>

                                <p className="font-inter font-bold">
                                    Rp {order.totalPrice?.toLocaleString("id-ID")}
                                </p>
                            </div>

                            <div>
                                <div
                                    className={`
                                        rounded-full px-4 py-2

                                        ${order.status === "processing" ? "bg-blue-100 text-blue-700" : ""}
                                        ${order.status === "shipped" ? "bg-purple-100 text-purple-700" : ""}
                                        ${order.status === "delivered" ? "bg-green-100 text-green-700" : ""}
                                        ${order.status === "cancelled" ? "bg-red-100 text-red-700" : ""}
                                        ${order.status === "pending" ? "bg-yellow-100 text-yellow-700" : ""}
                                    `}
                                >
                                    <p className="font-inter capitalize">
                                        ● {order.status}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    
                    <div className="mt-6">

                        <h2 className="font-oswald text-2xl mb-4">
                            Ordered Products
                        </h2>

                        <div className="space-y-4">

                            {order.items?.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-2xl shadow p-5"
                                >
                                    <div className="flex justify-between items-center">

                                        <div className="flex gap-5 items-center">

                                            <img
                                                src={
                                                    item.ProductSize?.Product?.image ||
                                                    red
                                                }
                                                alt=""
                                                className="w-full h-28 rounded-xl object-cover"
                                            />

                                            <div>

                                                <h3 className="font-oswald text-xl">
                                                    {item.ProductSize?.Product?.name}
                                                </h3>

                                                <p className="font-inter text-sm text-[#737373] mt-1">
                                                    Size : {item.ProductSize?.Size?.sizeName}
                                                </p>

                                                <p className="font-inter text-sm text-[#737373]">
                                                    Qty : {item.qty}
                                                </p>

                                            </div>

                                        </div>

                                        <div className="text-right">

                                            <p className="font-inter text-xs text-[#737373]">
                                                Subtotal
                                            </p>

                                            <p className="font-inter text-lg font-bold">
                                                Rp {(
                                                    item.qty *
                                                    item.ProductSize?.Product?.price
                                                )?.toLocaleString("id-ID")}
                                            </p>

                                        </div>

                                    </div>
                                </div>
                            ))}

                        </div>

                    </div>

                    <div className="bg-white rounded-2xl shadow p-6 mt-6">

                        <h2 className="font-oswald text-2xl mb-4">
                            Payment Summary
                        </h2>

                        <div className="flex justify-between">
                            <p className="font-inter">
                                Total Payment
                            </p>

                            <p className="font-inter font-bold text-xl">
                                Rp {order.totalPrice?.toLocaleString("id-ID")}
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}