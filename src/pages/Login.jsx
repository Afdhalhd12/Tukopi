import { Link, useNavigate } from "react-router-dom";
import ButtonComp from "../components/ButtonComp";
import { useContext, useState } from "react";
import api from "../utils/API";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();



    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const { data } = await api.post("/login", {
                email,
                password,
            });

            localStorage.setItem("token", data.data.token);
            localStorage.setItem("role", data.data.data.role);

            login();

            await Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Login berhasil",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });

            if (data.data.data.role === "admin") {
                navigate("/admin/usermanagement");
            } else {
                navigate("/");
            }

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Login Gagal",
                text:
                    error.response?.data?.message ||
                    error.message ||
                    "Terjadi kesalahan",
                confirmButtonColor: "#ef4444",
            });
        }
    };
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-8">
                <div className="col-span-4">
                    <div className="bg-[url('./assets/login-gambar.png')] bg-position-[70%_80%] md:h-screen h-100">

                    </div>
                </div>

                <div className="col-span-4">
                    <div className="text-center mt-10">
                        <div>
                            <h1 className="font-oswald text-3xl">ACCESS YOUR <span className="text-[#D4F931]">ACCOUNT</span></h1>
                            <p className="font-inter text-[#737373] mt-3">Welcome back to TuSneacker</p>
                            <form onSubmit={handleSubmit}>
                                <div className="mx-auto px-20 mt-10">
                                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address..." className="rounded-full w-full md:h-15 px-5 outline-[#D4F931] hover:shadow-[#D4F931] border border-[#D4F931]" />
                                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password..." className="rounded-full w-full md:h-15 px-5 outline-[#D4F931] hover:shadow-[#D4F931] border border-[#D4F931] mt-5" />

                                    <div className="mt-10">
                                        <button type="submit" className="rounded-full border-[#D4F931] font-inter p-2 text-sm bg-black text-white w-full">Login</button>

                                        <p className="font-inter text-[#737373] text-[12px] mt-3">Dont have an account?
                                            <Link to="/signup">
                                                <a className="text-[#D4F931] cursor-pointer"> Sign Up</a>
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}