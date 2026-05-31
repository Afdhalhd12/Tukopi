import SideBar from "../components/SideBar";
import red from "../assets/red.jpg";
import { LuMail } from "react-icons/lu";
import ButtonComp from "../components/buttonComp";
import { useEffect, useState } from "react";
import api from "../utils/API";
import { Link } from "react-router-dom";
export default function OrderHistory() {
    const [orders, setOrders] = useState([]);

    async function getOrders() {
        try {
            const response = await api.get("/order/foruser");
            setOrders(response.data.data);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

    useEffect(() => {
        getOrders();
    }, [])
    return (
        <div className="bg-[#f8f8f8] min-h-screen">
            <div className="grid grid-cols-8 ">
                <div className="col-span-2">
                    <SideBar />
                </div>
                <div className="col-span-6">
                    <div className="p-10 mt-10">
                        <p className="font-oswald text-2xl">Order History</p>
                        <div className="flex mt-2 gap-2">
                            <ButtonComp text={"All"} styling={"rounded-full border border-[#E5E5E5] font-inter text-white w-15 font-bold p-2 text-sm bg-black"} />
                            <ButtonComp text={"Pending"} styling={"rounded-full border border-[#E5E5E5] font-inter text-[#787878] max-w-full p-2 text-sm bg-[#f3f3f3]"} />
                            <ButtonComp text={"Processed"} styling={"rounded-full border border-[#E5E5E5] font-inter text-[#787878] max-w-full p-2 text-sm bg-[#f3f3f3]"} />
                            <ButtonComp text={"Shipped"} styling={"rounded-full border border-[#E5E5E5] font-inter text-[#787878] max-w-full p-2 text-sm bg-[#f3f3f3]"} />
                            <ButtonComp text={"Completed"} styling={"rounded-full border border-[#E5E5E5] font-inter text-[#787878] max-w-full p-2 text-sm bg-[#f3f3f3]"} />
                        </div>
                        {
                            orders.map((order) => (
                                <div key={order.id} className="bg-white shadow rounded-2xl p-6 mt-5">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-6">

                                            <div className="w-24 h-24 bg-black rounded-2xl flex flex-col items-center justify-center">
                                                <p className="text-white font-oswald text-3xl">
                                                    {order.items?.length}
                                                </p>
                                                <p className="text-white text-xs font-inter">
                                                    Items
                                                </p>
                                            </div>

                                            <div>

                                                <p className="font-inter text-sm text-[#737373]">
                                                    #INV/{order.id}
                                                </p>

                                                <h2 className="font-oswald text-2xl">
                                                    Order #{order.id}
                                                </h2>

                                                <div className="flex gap-10 mt-3">

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
                                                            Order Date
                                                        </p>

                                                        <p className="font-inter font-medium">
                                                            {new Date(order.orderDate).toLocaleDateString("id-ID")}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className="font-inter text-xs text-[#737373]">
                                                            Total Payment
                                                        </p>

                                                        <p className="font-inter font-semibold">
                                                            Rp. {order.totalPrice?.toLocaleString('id-ID')}
                                                        </p>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>


                                        <div className="flex flex-col items-end gap-3">

                                            <Link to={`/orderhistory/${order.id}`}>
                                                <ButtonComp text={"Lihat Detail"} styling="rounded-full w-full border border-[#E5E5E5] font-inter px-8 p-2 text-white text-sm bg-black" />
                                            </Link>

                                            <div className={`rounded-full w-full px-4 py-2
                                                ${order.status == "processing" ? "bg-blue-100" : ""}
                                                ${order.status == "shipped" ? "bg-purple-100" : ""}
                                                ${order.status == "delivered" ? "bg-green-100" : ""}
                                                ${order.status == "cancelled" ? "bg-red-100" : ""}
                                                ${order.status == "pending" ? "bg-yellow-100" : ""}
                                                `}>
                                                <p className={`font-inter font-medium capitalize
                                                    ${order.status == "processing" ? "text-blue-700" : ""}
                                                    ${order.status == "shipped" ? "text-purple-700" : ""}
                                                    ${order.status == "delivered" ? "text-green-700" : ""}
                                                    ${order.status == "cancelled" ? "text-red-700" : ""}
                                                    ${order.status == "pending" ? "text-yellow-700" : ""}
                                                    `}>
                                                    ● {order.status}
                                                </p>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}