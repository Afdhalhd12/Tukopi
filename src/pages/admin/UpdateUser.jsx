import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/API";
import AdminBar from "../../components/AdminBar";
import Swal from "sweetalert2";

export default function UpdateUser() {
    const { id } = useParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [photoProfile, setPhotoProfile] = useState(null);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    async function getUser() {
        try {
            const response = await api.get('/showuser/' + id);
            setEmail(response.data.data.email);
            setName(response.data.data.name);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);

        if (password) {
            formData.append("password", password)
        }

        if (photoProfile) {
            formData.append("photoProfile", photoProfile);
        }
        try {
            const response = await api.put("/updateuser/" + id, formData);

            await Swal.fire({
                icon: "success",
                title: "Berhasil Memperbarui data Pengguna",
                text: "Sampai jumpa kembali!",
                timer: 1500,
                showConfirmButton: false,
            });

            navigate("/admin/usermanagement");

        } catch (error) {
            setMessage(error.message);
        }
    }



    useEffect(() => {
        getUser();
    }, []);
    return (
        <div className="bg-[#f8f8f8] min-h-screen">
            <div className="grid grid-cols-8">
                <div className="col-span-2">
                    <AdminBar />
                </div>

                <div className="col-span-6">
                    <div className="p-10 mt-10">
                        <form onSubmit={handleSubmit}>
                            <div className="bg-white rounded-2xl w-full shadow p-5">

                                <div className="flex items-center gap-3">
                                    <img
                                        src={
                                            photoProfile
                                                ? URL.createObjectURL(photoProfile) : "well"

                                        }
                                        className="w-35 h-35 rounded-full object-cover"
                                    />

                                    <div>
                                        <label className="rounded-xl border border-[#E5E5E5] font-inter text-white font-bold p-2 bg-black cursor-pointer inline-block text-sm">
                                            Change Photo

                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => setPhotoProfile(e.target.files[0])}
                                            />
                                        </label>

                                        <p className="text-[12px] text-[#737373] mt-2 ms-2 font-inter">
                                            JPG or PNG. Max size 2MB.
                                        </p>
                                    </div>
                                </div>

                                <hr className="mt-5 text-[#737373]" />

                                <div className="mt-5">
                                    <p className="font-inter text-[#737373]">
                                        Personal Information
                                    </p>
                                </div>

                                <div>
                                    <div className="mt-2">
                                        <label className="font-inter">
                                            Your Name
                                        </label>

                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            placeholder="Type Your Name"
                                            className="w-full font-inter bg-[#f3f3f3] rounded-xl p-3 border border-[#737373]"
                                        />
                                    </div>

                                    <div className="mt-5">
                                        <div className="grid grid-cols-4 gap-5">

                                            <div className="col-span-2">
                                                <label className="font-inter">
                                                    Email Address
                                                </label>

                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                    placeholder="Type Your Email"
                                                    className="w-full font-inter bg-[#f3f3f3] rounded-xl p-3 border border-[#737373]"
                                                />
                                            </div>

                                            <div className="col-span-2">
                                                <label className="font-inter">
                                                    Password
                                                </label>

                                                <input
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) =>
                                                        setPassword(e.target.value)
                                                    }
                                                    placeholder="Leave empty if no change"
                                                    className="w-full font-inter bg-[#f3f3f3] rounded-xl p-3 border border-[#737373]"
                                                />
                                            </div>

                                        </div>

                                        {message && (
                                            <p className="text-red-500 mt-4">
                                                {message}
                                            </p>
                                        )}

                                        <hr className="mt-10 text-[#737373]" />

                                        <div className="flex justify-center gap-2 mt-5">
                                            <button
                                                type="submit"
                                                onClick={() => navigate("/admin/usermanagement")}
                                                className="rounded-xl border border-[#E5E5E5] font-inter text-white w-100 font-bold p-2 text-sm bg-black"
                                            >
                                                Save Changes
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => navigate("/admin/usermanagement")}
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
    )
}