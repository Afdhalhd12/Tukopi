import { useState } from "react";
import AdminBar from "../../components/AdminBar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../utils/API";

export default function CreateProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

     async function handleSubmit(e) {
        e.preventDefault();
        try {
            const formData = new FormData();

            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("brand", brand);
            formData.append("category", category);



            if (image) {
                formData.append("image", image);
            }
            const response = await api.post("/product", formData);

            await Swal.fire({
                icon: "success",
                title: "Produk Berhasil Dibuat",
                text: "Data produk berhasil ditambahkan.",
                timer: 1500,
                showConfirmButton: false,
            });
            navigate("/admin/productmanagement");

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Gagal Membuat Produk",
                text:
                    error.response?.data?.message ||
                    error.message ||
                    "Terjadi kesalahan",
            });
        }
    }
    return (
        <>
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
                                            src={preview}
                                            className="w-35 h-35 rounded-full object-cover"
                                        />

                                        <div>
                                            <label className="rounded-xl border border-[#E5E5E5] font-inter text-white font-bold p-2 bg-black cursor-pointer inline-block text-sm">
                                                Change Photo

                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0]; setImage(file); setPreview(URL.createObjectURL(file));
                                                    }}
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
                                                Product Name
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
                                            <label className="font-inter">
                                                Price
                                            </label>

                                            <input
                                                type="number"
                                                value={price}
                                                onChange={(e) =>
                                                    setPrice(e.target.value)
                                                }
                                                placeholder="Type Your Name"
                                                className="w-full font-inter bg-[#f3f3f3] rounded-xl p-3 border border-[#737373]"
                                            />
                                        </div>

                                        <div className="mt-5">
                                            <div className="grid grid-cols-4 gap-5">

                                                <div className="col-span-2">
                                                    <label className="font-inter">
                                                        Brand
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={brand}
                                                        onChange={(e) =>
                                                            setBrand(e.target.value)
                                                        }
                                                        placeholder="Type brand the product"
                                                        className="w-full font-inter bg-[#f3f3f3] rounded-xl p-3 border border-[#737373]"
                                                    />
                                                </div>

                                                <div className="col-span-2">
                                                    <label className="font-inter">
                                                        category
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={category}
                                                        onChange={(e) =>
                                                            setCategory(e.target.value)
                                                        }
                                                        placeholder="Leave empty if no change"
                                                        className="w-full font-inter bg-[#f3f3f3] rounded-xl p-3 border border-[#737373]"
                                                    />
                                                </div>

                                            </div>
                                            <div className="mt-5">
                                                <label className="font-inter">
                                                    Description
                                                </label>
                                                <textarea placeholder="Type Here" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full font-inter bg-[#f3f3f3] rounded-xl p-3 border border-[#737373]" />
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
                                                    className="rounded-xl border border-[#E5E5E5] font-inter text-white w-100 font-bold p-2 text-sm bg-black"
                                                >
                                                    Save Changes
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => navigate("/admin/productmanagement")}
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