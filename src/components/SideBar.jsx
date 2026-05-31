import { CiLocationOn, CiSettings } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
import { LuBox } from "react-icons/lu";
import { MdOutlinePayment } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";


export default function SideBar() {
    const location = useLocation();
    return (
        <>
            <div>
                <aside className="fixed left-0 lg:flex flex-col h-screen border-r w-80 border-[#d1cece] bg-[#f3f3f3]">
                    <div className="px-4 mb-6 mt-20">
                        <div className="font-headline-md text-headline-md text-primary text-2xl mb-1 font-oswald">Afdhal</div>
                        <div className="font-label-bold text-label-bold text-secondary text-[#D4F931] font-inter mt-2">User</div>
                    </div>
                    <div className="px-4 mb-6 mt-1">
                        <div className="">
                            <Link to="/profile">
                                <button className={location.pathname === "/profile" || location.pathname === "/editprofile"  ? "h-full font-inter border-s-5 flex items-center text-[#D4F931]  gap-2 text-[16px] bg-[#f7fce4] w-full p-3 rounded-2xl" : "h-full font-inter flex items-center gap-2 text-[16px] text-[#585757]  w-full p-3 rounded-2xl"}>
                                    <IoPerson size={20} /> Profile
                                </button>
                            </Link>
                        </div>

                        <div className="mt-5">
                            <Link to="/orderhistory">
                                <button className={location.pathname === "/orderhistory" ? "h-full font-inter border-s-5 flex items-center text-[#D4F931]  gap-2 text-[16px] bg-[#f7fce4] w-full p-3 rounded-2xl" : "h-full font-inter flex items-center gap-2 text-[16px] text-[#585757]  w-full p-3 rounded-2xl"}>
                                    <LuBox size={20} /> Order History
                                </button>
                            </Link>
                        </div>

                        <div className="mt-5">
                            <Link to="/address">
                            <button className={location.pathname === "/address" || location.pathname === "/createaddress" ? "h-full font-inter border-s-5 flex items-center text-[#D4F931]  gap-2 text-[16px] bg-[#f7fce4] w-full p-3 rounded-2xl" : "h-full font-inter flex items-center gap-2 text-[16px] text-[#585757]  w-full p-3 rounded-2xl"}>
                                <CiLocationOn size={20} /> Address
                            </button>
                            </Link>
                        </div>

                        <div className="mt-5">
                            <button className="h-full font-inter flex items-center gap-2 text-[16px] text-[#585757]  w-full p-3 rounded-2xl">
                                <MdOutlinePayment size={20} /> Payment
                            </button>
                        </div>

                        <div className="mt-5">
                            <button className="h-full font-inter flex items-center gap-2 text-[16px] text-[#585757]  w-full p-3 rounded-2xl">
                                <CiSettings size={20} /> Settings
                            </button>
                        </div>

                    </div>

                </aside>
            </div>
        </>
    )
}