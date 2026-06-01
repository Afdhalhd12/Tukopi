import { IoPerson } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { CiLocationOn, CiWallet } from "react-icons/ci";
import { LuMail } from "react-icons/lu";
import { MdFavoriteBorder, MdOutlinePayment, MdOutlineShoppingBasket } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import SideBar from "../components/SideBar";
import red from "../assets/red.jpg";
import ButtonComp from "../components/buttonComp";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import api from "../utils/API";
export default function Profile() {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState("");

    async function getOrders() {
        try {
            let url = "/order/foruser";
            const response = await api.get(url);
            setOrders(response.data.data);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

    const validOrders = orders.filter(
        (order) => !['pending', 'cancelled'].includes(order.status)
    );

    const totalOrder = validOrders.length;
    const deliveredTotal = orders.filter(order => order.status === "delivered").length;
    const processingTotal = orders.filter(order => order.status === "processing").length;



    async function getProfile() {

        try {
            const response = await api.get("/me");

            setUser(response.data.data);

        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        AOS.init({
            duration: 600,
            easing: "ease-out-cubic",
            once: true,
        });

        getProfile();
        getOrders();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }
    return (
        <div className="bg-[#f8f8f8] min-h-screen">
            <div className="grid grid-cols-8">

                {/* Sidebar */}
                <div className="col-span-2">
                    <SideBar />
                </div>

                {/* Content */}
                <div className="col-span-6 mt-20">

                    {/* Profile Card */}
                    <div className="p-10">
                        <div
                            className="bg-white shadow rounded-2xl p-5"
                            data-aos="fade-down"
                        >
                            <div className="flex justify-between items-center gap-5">

                                <div className="flex items-center gap-3">
                                    <img
                                        src={user.photoProfile}
                                        className="w-35 h-35 rounded-full object-cover"
                                        alt={user.name}
                                    />

                                    <div>
                                        <p className="font-inter text-3xl mb-2">
                                            {user.name}
                                        </p>

                                        <div className="flex gap-5">
                                            <p className="font-inter text-[#737373] flex gap-1 items-center">
                                                <LuMail size={15} />
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <Link to={"/editprofile"} data-aos="fade-left" data-aos-delay="200">
                                    <ButtonComp
                                        text={"Edit Profile"}
                                        styling={
                                            "rounded-full border border-[#E5E5E5] font-inter p-2 w-40 text-white text-sm bg-black"
                                        } />
                                </Link>

                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="px-10">
                        <div className="grid grid-cols-6 gap-4">

                            {/* Total Orders */}
                            <div
                                className="col-span-2"
                                data-aos="zoom-in"
                                data-aos-delay="100"
                            >
                                <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-10 h-10 bg-[#f8f8f8] border border-[#E5E5E5] rounded-xl flex items-center justify-center">
                                            <MdOutlineShoppingBasket
                                                size={20}
                                                className="text-black"
                                            />
                                        </div>

                                        <span className="text-xs text-[#737373]">
                                            +2 this month
                                        </span>
                                    </div>

                                    <p className="font-inter text-sm text-[#737373] mb-1">
                                        Total Orders
                                    </p>

                                    <p className="font-inter text-3xl font-medium text-black">
                                        {totalOrder}
                                    </p>
                                </div>
                            </div>

                            {/* delivered */}
                            <div
                                className="col-span-2"
                                data-aos="zoom-in"
                                data-aos-delay="200"
                            >
                                <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-10 h-10 bg-[#f8f8f8] border border-[#E5E5E5] rounded-xl flex items-center justify-center">
                                            <MdFavoriteBorder
                                                size={20}
                                                className="text-black"
                                            />
                                        </div>

                                        <span className="text-xs text-[#737373]">
                                            +2 this month
                                        </span>
                                    </div>

                                    <p className="font-inter text-sm text-[#737373] mb-1">
                                      Processing
                                    </p>

                                    <p className="font-inter text-3xl font-medium text-black">
                                        {processingTotal}
                                    </p>
                                </div>
                            </div>

                            {/* terkirim */}
                            <div
                                className="col-span-2"
                                data-aos="zoom-in"
                                data-aos-delay="300"
                            >
                                <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-10 h-10 bg-[#f8f8f8] border border-[#E5E5E5] rounded-xl flex items-center justify-center">
                                            <CiWallet
                                                size={20}
                                                className="text-black"
                                            />
                                        </div>

                                        <span className="text-xs text-[#737373]">
                                            +2 this month
                                        </span>
                                    </div>

                                    <p className="font-inter text-sm text-[#737373] mb-1">
                                        Deliverred
                                    </p>

                                    <p className="font-inter text-3xl font-medium text-black">
                                        {deliveredTotal}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}