import { FaLocationDot } from "react-icons/fa6";
import { FiPenTool } from "react-icons/fi";
import { MdOutlineHome, MdOutlineBusinessCenter, MdOutlineAdd, MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import SideBar from "../components/SideBar";
import ButtonComp from "../components/buttonComp";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/API";
import AOS from "aos";
import "aos/dist/aos.css";



export default function Address() {
    const [addresses, setAddresses] = useState(null);

    async function getAddress() {
        try {
            const response = await api.get("/address");

            setAddresses(response.data.data);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    async function handleDelete(id) {
        const confirmDelete = window.confirm("Yakin ingin menghapus alamat ini?");

        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete(`/address/${id}`);

            // prev digunakan untuk mengambil hasil state sebelumnya
            setAddresses((prev) => prev.filter((item) => item.id !== id));

            alert("Address berhasil dihapus");
        } catch (error) {
            console.log(error.response?.data || error.message);
            alert("Gagal menghapus address");
        }
    }


    // async function getAddress() {
    //     const url = "http://localhost:3000/address";

    //     try {
    //         const response = await fetch(url, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });

    //         if (!response.ok) {
    //             throw new Error(`Response status: ${response.status}`);
    //         }

    //         const result = await response.json();
    //         setAddresses(result.data);

    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }
    useEffect(() => {
        getAddress();
    }, []);

    if (!addresses) {
        return <div>Loading...</div>;
    }
    return (
        <div className="bg-[#f8f8f8] min-h-screen">
            <div className="grid grid-cols-8">
                <div className="col-span-2">
                    <SideBar />
                </div>

                <div className="col-span-6 mt-20">
                    <div className="p-10">


                        <div className="bg-white shadow rounded-2xl p-5 mb-6">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#f8f8f8] border border-[#E5E5E5] rounded-xl flex items-center justify-center">
                                        <FaLocationDot size={18} className="text-black" />
                                    </div>
                                    <div>
                                        <p className="font-inter text-xl font-medium">My Addresses</p>
                                        <p className="font-inter text-sm text-[#737373]">
                                            {addresses.length} addresses saved
                                        </p>
                                    </div>
                                </div>
                                <Link to="/createaddress">
                                    <ButtonComp
                                        text={
                                            <span className="flex items-center gap-1">
                                                <MdOutlineAdd size={16} /> Add New Address
                                            </span>
                                        }
                                        styling="rounded-full border border-[#E5E5E5] font-inter p-2 px-4 text-white text-sm bg-black"
                                    />
                                </Link>
                            </div>
                        </div>

                        {/* Address List */}
                        <div className="flex flex-col gap-4">
                            {addresses.map((address) => (
                                <div
                                    key={address.id}
                                    className="bg-white shadow rounded-2xl p-5 border border-[#E5E5E5]"
                                >
                                    {/* Card Top Row */}
                                    <div className="flex justify-between items-start mb-3">
                                        <span
                                            className={`text-xs font-inter px-3 py-1 rounded-full ${address.isPrimary
                                                ? "bg-black text-white"
                                                : "bg-[#f8f8f8] text-[#737373] border border-[#E5E5E5]"
                                                }`}
                                        >
                                            {address.isPrimary ? "Primary" : "Other"}
                                        </span>

                                        <div className="flex gap-2">
                                            <Link to={"/editaddress/" + address.id}>
                                                <button className="w-8 h-8 border border-[#E5E5E5] bg-[#f8f8f8] rounded-xl flex items-center justify-center hover:bg-[#E5E5E5] transition">
                                                    <MdOutlineEdit size={15} className="text-[#737373]" />
                                                </button>
                                            </Link>
                                            <button onClick={() => handleDelete(address.id)} className="w-8 h-8 border border-[#E5E5E5] bg-[#f8f8f8] rounded-xl flex items-center justify-center hover:bg-red-50 transition">
                                                <MdOutlineDelete size={15} className="text-red-500" />
                                            </button>
                                        </div>
                                    </div>


                                    <p className="font-inter font-medium text-base text-black mb-1">
                                        {address.User.name}
                                    </p>


                                    <p className="font-inter text-sm text-[#737373] leading-relaxed">
                                        {address.addressLine}
                                        <br />
                                        {address.city}, {address.postalCode}
                                    </p>

                                    {/* Footer */}
                                    <div className="border-t border-[#E5E5E5] mt-4 pt-3 flex items-center gap-2">
                                        {address.label === "home" ? (
                                            <MdOutlineHome size={16} className="text-[#737373]" />
                                        ) : (
                                            <MdOutlineBusinessCenter size={16} className="text-[#737373]" />
                                        )}
                                        <span className="font-inter text-xs text-[#737373] capitalize">
                                            {address.label}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}