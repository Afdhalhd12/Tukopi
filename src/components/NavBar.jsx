import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import CartDrawer from "./CartDrawer";
export default function NavBar() {
    const navigate = useNavigate();
    const { isLogin, logout, role } = useContext(AuthContext);
    const [isCartOpen, setIsCartOpen] = useState(false);


    const handleLogout = async () => {
        const result = await Swal.fire({
            title: "Logout?",
            text: "Anda akan keluar dari akun ini.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, Logout",
            cancelButtonText: "Batal",
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            logout();
            localStorage.removeItem("token");
            localStorage.removeItem("role");

            await Swal.fire({
                icon: "success",
                title: "Berhasil Logout",
                text: "Sampai jumpa kembali!",
                timer: 1500,
                showConfirmButton: false,
            });

            navigate("/login");
        }
    };
    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-[#E5E5E5]">
                <div className="px-12 h-18 flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/">
                        <span className="font-oswald font-bold text-3xl tracking-widest text-[#0A0A0A]">
                            TUSNEAKER<span className="text-[#D4F931]">.</span>
                        </span>
                    </Link>

                    {/* Links */}
                    <div className="flex items-center gap-1">
                        <Link to="/">
                            <button className="px-4 py-2 text-sm font-inter font-medium text-[#0A0A0A] hover:bg-[#F5F5F5] rounded-full transition-colors">Home</button>
                        </Link>
                        <Link to="/productlist">
                            <button className="px-4 py-2 text-sm font-inter font-medium text-[#0A0A0A] hover:bg-[#F5F5F5] rounded-full transition-colors">Collections</button>
                        </Link>

                        {
                            role === 'user' ? <Link to="/profile">
                                <button className="px-4 py-2 text-sm font-inter font-medium text-[#0A0A0A] hover:bg-[#F5F5F5] rounded-full transition-colors">Profile</button>
                            </Link> : ""

                        }
                        {
                            role === 'admin' ? <Link to="/admin/dashboard">
                                <button className="px-4 py-2 text-sm font-inter font-medium text-[#0A0A0A] hover:bg-[#F5F5F5] rounded-full transition-colors">Admin Dashboard</button>
                            </Link> : ""

                        }
                    </div>

                    {/* Auth */}
                    <div className="flex items-center gap-3">
                        <button onClick={() => setIsCartOpen(true)} className="text-sm font-inter font-medium text-[#737373] hover:text-[#0A0A0A] transition-colors">Cart</button>
                        <div className="w-px h-4 bg-[#E5E5E5]" />
                        {!isLogin ? (
                            <Link to="/login">
                                <button className="px-6 py-2.5 rounded-full text-sm font-inter font-bold bg-[#0A0A0A] text-white hover:bg-[#2a2a2a] transition-colors">
                                    Login →
                                </button>
                            </Link>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="px-6 py-2.5 rounded-full text-sm font-inter font-bold border-2 border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors"
                            >
                                Sign Out
                            </button>
                        )}
                    </div>

                </div>
            </nav>
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}