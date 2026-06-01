import { useState } from "react";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import api from "../utils/API";
import Swal from "sweetalert2";

export default function CreateAddress() {
    const [addressLine, setAddressLine] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [label, setLabel] = useState("");
    const [notes, setNotes] = useState("");
    const [message, setMessage] = useState("");
    const [isPrimary, setIsPrimary] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/address", {
                addressLine,
                city,
                postalCode,
                label,
                notes,
                isPrimary
            });

            await Swal.fire({
                icon: "success",
                title: "Berhasil Membuat Alamat Pengguna",
                text: "Sampai jumpa kembali!",
                timer: 1500,
                showConfirmButton: false,
            });
            navigate("/address");

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Gagal Menambahkan Alamat",
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
            <div className="bg-[#f8f8f8] min-h-screen">
                <div className="grid grid-cols-8">
                    <div className="col-span-2">
                        <SideBar />
                    </div>

                    <div className="col-span-6">
                        <div className="p-10 mt-10">
                            <form onSubmit={handleSubmit} >
                                <div className="bg-white rounded-2xl w-full shadow p-5">

                                    <p className="font-oswald text-2xl">Create Your Address</p>
                                    <hr className="mt-5 text-[#737373]" />

                                    {/* <div className="mt-5">
                                                <p className="font-inter text-[#737373]">
                                                    Personal Information
                                                </p>
                                            </div> */}

                                    <div>
                                        <div className="mt-2">
                                            <label className="font-inter">
                                                Address Line
                                            </label>

                                            <input
                                                type="text"
                                                value={addressLine}
                                                onChange={(e) =>
                                                    setAddressLine(e.target.value)
                                                }
                                                placeholder="Jl. Kemayoran No. 250, RT 05/RW 02"
                                                className="w-full font-inter bg-[#f3f3f3] rounded-xl p-3 border border-[#737373]"
                                            />
                                        </div>

                                        <div className="mt-5">
                                            <div className="grid grid-cols-4 gap-5">

                                                <div className="col-span-2">
                                                    <label className="font-inter">
                                                        City
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={city}
                                                        onChange={(e) =>
                                                            setCity(e.target.value)
                                                        }
                                                        placeholder="City"
                                                        className="w-full font-inter bg-[#f3f3f3] rounded-xl p-3 border border-[#737373]"
                                                    />
                                                </div>

                                                <div className="col-span-2">
                                                    <label className="font-inter">
                                                        Postal Code
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={postalCode}
                                                        onChange={(e) =>
                                                            setPostalCode(e.target.value)
                                                        }
                                                        placeholder="16730"
                                                        className="w-full font-inter bg-[#f3f3f3] rounded-xl p-3 border border-[#737373]"
                                                    />
                                                </div>

                                            </div>
                                            <div className="mt-5">
                                                <label className="font-inter">
                                                    Label
                                                </label>

                                                <select
                                                    className="w-full font-inter bg-[#f3f3f3] rounded-xl p-3 border border-[#737373]"
                                                    value={label}
                                                    onChange={(e) => setLabel(e.target.value)}
                                                >
                                                    <option value="">
                                                        Select Label
                                                    </option>

                                                    <option value="home">
                                                        Home
                                                    </option>

                                                    <option value="office">
                                                        Office
                                                    </option>
                                                </select>
                                            </div>

                                            <div className="mt-5">
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={isPrimary}
                                                        onChange={(e) => setIsPrimary(e.target.checked)}
                                                    />
                                                    Set as Primary Address
                                                </label>
                                            </div>

                                            <div className="mt-5">
                                                <label className="font-inter">Notes (Optional)</label>
                                                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full font-inter bg-[#f3f3f3] rounded-xl p-3 border border-[#737373]" />
                                            </div>

                                            {message && (
                                                <p className="text-red-500 mt-4">
                                                    {message}
                                                </p>
                                            )}

                                            {/* <hr className="mt-10 text-[#737373]" /> */}

                                            <div className="flex justify-center gap-2 mt-5">
                                                <button
                                                    type="submit"
                                                    className="rounded-xl border border-[#E5E5E5] font-inter text-white w-100 font-bold p-2 text-sm bg-black"
                                                >
                                                    Save Changes
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => navigate("/address")}
                                                    className="rounded-xl border border-[#737373] font-inter text-black w-100 font-bold p-2 text-sm bg-[#f8f8f8]"
                                                >
                                                    Cancel
                                                </button>
                                            </div>

                                        </div>
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