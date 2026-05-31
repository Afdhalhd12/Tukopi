import { CiLocationOn, CiSettings } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
import { LuBox } from "react-icons/lu";
import { MdOutlinePayment, MdProductionQuantityLimits } from "react-icons/md";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";


export default function AdminBar() {
    const location = useLocation();
    const isUserManagementActive = location.pathname === "/admin/usermanagement" || location.pathname.startsWith("/admin/updateuser/");
    const isProductManagementActive = location.pathname === "/admin/productmanagement" || location.pathname.startsWith("/admin/updateproduct/") || location.pathname.startsWith("/admin/productmanagement") || location.pathname === "/admin/createproduct";
    return (
        <>
            <div>
                <aside className="fixed left-0 lg:flex flex-col h-screen border-r w-80 border-[#d1cece] bg-white">
                    <div className="px-4 mb-6 mt-20">
                        <div className="font-headline-md text-headline-md text-primary text-2xl mb-1 font-oswald">Afdhal Hadi Solahudin</div>
                        <div className="font-label-bold text-label-bold text-secondary text-[#D4F931] font-inter mt-2">Admin</div>
                    </div>
                    <div className="px-4 mb-6 mt-1">
                        <div className="">
                            <Link to="/admin/dashboard">
                                <button className={location.pathname === "/admin/dashboard" ? "h-full font-inter border-s-5 flex items-center text-[#D4F931]  gap-2 text-[16px] bg-[#f7fce4] w-full p-3 rounded-2xl" : "h-full font-inter flex items-center gap-2 text-[16px] text-[#585757]  w-full p-3 rounded-2xl"}>
                                    <RiDashboardHorizontalLine size={20} /> Dashboard
                                </button>
                            </Link>
                        </div>

                        <div className="mt-5">
                            <Link to="/admin/usermanagement">
                                <button className={isUserManagementActive ? "h-full font-inter border-s-5 flex items-center text-[#D4F931]  gap-2 text-[16px] bg-[#f7fce4] w-full p-3 rounded-2xl" : "h-full font-inter flex items-center gap-2 text-[16px] text-[#585757]  w-full p-3 rounded-2xl"}>
                                    <IoPerson size={20} />User Management
                                </button>
                            </Link>
                        </div>

                        <div className="mt-5">
                            <Link to="/admin/productmanagement">
                                <button className={isProductManagementActive ? "h-full font-inter border-s-5 flex items-center text-[#D4F931]  gap-2 text-[16px] bg-[#f7fce4] w-full p-3 rounded-2xl" : "h-full font-inter flex items-center gap-2 text-[16px] text-[#585757]  w-full p-3 rounded-2xl"}>
                                    <MdProductionQuantityLimits size={20} /> Product
                                </button>
                            </Link>
                        </div>

                    </div>

                </aside>
            </div>
        </>
    )
}