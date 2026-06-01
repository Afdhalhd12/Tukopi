import SideBar from "../components/SideBar";
import red from "../assets/red.jpg";
import { LuMail } from "react-icons/lu";
import ButtonComp from "../components/buttonComp";
import { useEffect, useState } from "react";
import api from "../utils/API";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
export default function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState("");

    async function getOrders() {
        try {
            let url = "/order/foruser";

            if (status) {
                url += "?status=" + status;
            }

            const response = await api.get(url);
            setOrders(response.data.data);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

    useEffect(() => {
        AOS.init({
            duration: 600,
            easing: "ease-out-cubic",
            once: true,
        });

        getOrders();
    }, [status]);

    useEffect(() => {
        AOS.refresh();
    }, [orders]);
    return (
        <div className="bg-[#f8f8f8] min-h-screen">
            <div className="grid grid-cols-8">
                <div className="col-span-2">
                    <SideBar />
                </div>

                <div className="col-span-6">
                    <div className="p-10 mt-10">
                        <p
                            className="font-oswald text-2xl"
                            data-aos="fade-right"
                        >
                            Order History
                        </p>

                        <div
                            className="flex mt-2 gap-2"
                            data-aos="fade-up"
                        >
                            <button
                                onClick={() => setStatus("")}
                                className={`${status === ""
                                    ? "rounded-full border border-[#E5E5E5] font-inter text-white max-w-full font-bold p-2 text-sm bg-black"
                                    : "rounded-full border border-[#E5E5E5] font-inter text-[#787878] max-w-full p-2 text-sm bg-[#f3f3f3]"
                                    }`}
                            >
                                All
                            </button>

                            <button
                                onClick={() => setStatus("pending")}
                                className={`${status === "pending"
                                    ? "rounded-full border border-[#E5E5E5] font-inter text-white max-w-full font-bold p-2 text-sm bg-black"
                                    : "rounded-full border border-[#E5E5E5] font-inter text-[#787878] max-w-full p-2 text-sm bg-[#f3f3f3]"
                                    }`}
                            >
                                Pending
                            </button>

                            

                            <button
                                onClick={() => setStatus("processing")}
                                className={`${status === "processing"
                                    ? "rounded-full border border-[#E5E5E5] font-inter text-white max-w-full font-bold p-2 text-sm bg-black"
                                    : "rounded-full border border-[#E5E5E5] font-inter text-[#787878] max-w-full p-2 text-sm bg-[#f3f3f3]"
                                    }`}
                            >
                                Processing
                            </button>

                            <button
                                onClick={() => setStatus("shipped")}
                                className={`${status === "shipped"
                                    ? "rounded-full border border-[#E5E5E5] font-inter text-white max-w-full font-bold p-2 text-sm bg-black"
                                    : "rounded-full border border-[#E5E5E5] font-inter text-[#787878] max-w-full p-2 text-sm bg-[#f3f3f3]"
                                    }`}
                            >
                                Shipped
                            </button>

                            <button
                                onClick={() => setStatus("delivered")}
                                className={`${status === "delivered"
                                    ? "rounded-full border border-[#E5E5E5] font-inter text-white max-w-full font-bold p-2 text-sm bg-black"
                                    : "rounded-full border border-[#E5E5E5] font-inter text-[#787878] max-w-full p-2 text-sm bg-[#f3f3f3]"
                                    }`}
                            >
                                Delivered
                            </button>

                            <button
                                onClick={() => setStatus("cancelled")}
                                className={`${status === "cancelled"
                                    ? "rounded-full border border-[#E5E5E5] font-inter text-white max-w-full font-bold p-2 text-sm bg-black"
                                    : "rounded-full border border-[#E5E5E5] font-inter text-[#787878] max-w-full p-2 text-sm bg-[#f3f3f3]"
                                    }`}
                            >
                                Cancelled
                            </button>
                        </div>

                        {orders.map((order, index) => (
                            <div
                                key={order.id}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                                className="bg-white shadow rounded-2xl p-6 mt-5 hover:shadow-lg transition-all duration-300"
                            >
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
                                                        {new Date(
                                                            order.orderDate
                                                        ).toLocaleDateString(
                                                            "id-ID"
                                                        )}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="font-inter text-xs text-[#737373]">
                                                        Total Payment
                                                    </p>

                                                    <p className="font-inter font-semibold">
                                                        Rp.{" "}
                                                        {order.totalPrice?.toLocaleString(
                                                            "id-ID"
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-3">
                                        <Link
                                            to={`/orderhistory/${order.id}`}
                                        >
                                            <ButtonComp
                                                text={"Lihat Detail"}
                                                styling="rounded-full w-full border border-[#E5E5E5] font-inter px-8 p-2 text-white text-sm bg-black"
                                            />
                                        </Link>

                                        <div
                                            className={`rounded-full w-full px-4 py-2
                                        ${order.status === "processing"
                                                    ? "bg-blue-100"
                                                    : ""
                                                }
                                        ${order.status === "shipped"
                                                    ? "bg-purple-100"
                                                    : ""
                                                }
                                        ${order.status === "delivered"
                                                    ? "bg-green-100"
                                                    : ""
                                                }
                                        ${order.status === "cancelled"
                                                    ? "bg-red-100"
                                                    : ""
                                                }
                                        ${order.status === "pending"
                                                    ? "bg-yellow-100"
                                                    : ""
                                                }`}
                                        >
                                            <p
                                                className={`font-inter font-medium capitalize
                                            ${order.status === "processing"
                                                        ? "text-blue-700"
                                                        : ""
                                                    }
                                            ${order.status === "shipped"
                                                        ? "text-purple-700"
                                                        : ""
                                                    }
                                            ${order.status === "delivered"
                                                        ? "text-green-700"
                                                        : ""
                                                    }
                                            ${order.status === "cancelled"
                                                        ? "text-red-700"
                                                        : ""
                                                    }
                                            ${order.status === "pending"
                                                        ? "text-yellow-700"
                                                        : ""
                                                    }`}
                                            >
                                                ● {order.status}
                                            </p>
                                            
                                        </div>
                                        {
                                            order.status === "pending" ?  <Link to={`/payment/${order.id}`} className="mx-auto">Bayar sekarang</Link> : ""
                                        }
                                       
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}