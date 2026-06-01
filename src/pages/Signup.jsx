import { Link, useNavigate } from "react-router-dom";
import ButtonComp from "../components/ButtonComp";
import { useState } from "react";
import Swal from "sweetalert2";
import api from "../utils/API";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/signup", {
                name,
                email,
                password
            });

            await Swal.fire({
                icon: "success",
                title: "Berhasil Membuat Akun Pengguna",
                text: "Ayo Login!",
                timer: 1500,
                showConfirmButton: false,
            });
            navigate("/login");

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Gagal Membuat akkun",
                text:
                    error.response?.data?.message ||
                    error.message ||
                    "Terjadi kesalahan",
                confirmButtonColor: "#ef4444",
            });
        }
    }
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
                            <h1 className="font-oswald text-3xl">CREATE YOUR <span className="text-[#D4F931]">ACCOUNT</span></h1>
                            <p className="font-inter text-[#737373] mt-3">Welcome to TuSneacker</p>
                            <form onSubmit={handleSubmit}>
                                <div className="mx-auto px-20 mt-10">
                                    <input type="text" placeholder="username" value={name} onChange={(e) => setName(e.target.value)} className="rounded-full w-full md:h-15 px-5 outline-[#D4F931] hover:shadow-[#D4F931] border border-[#D4F931]" />
                                    <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-full w-full md:h-15 px-5 outline-[#D4F931] hover:shadow-[#D4F931] border border-[#D4F931] mt-5" />
                                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-full w-full md:h-15 px-5 outline-[#D4F931] hover:shadow-[#D4F931] border border-[#D4F931] mt-5" />

                                    <div className="mt-10">
                                        <ButtonComp text={"Sign up"} styling={"rounded-full border-[#D4F931] font-inter p-2 text-sm bg-black text-white w-full "} />
                                        <p className="font-inter text-[#737373] text-[12px] mt-3">Already have an account?
                                            <Link to="/Login">
                                                <a className="text-[#D4F931] cursor-pointer"> Login</a>
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