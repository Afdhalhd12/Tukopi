import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../utils/API";
import { useEffect, useState } from "react";
import AdminBar from "../../components/AdminBar";

export default function CreateProductSize() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [size, setSize] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
    const [stock, setStock] = useState(null);
    const [message, setMessage] = useState("");

    async function getSizes() {
        try {
            const response = await api.get("/size");

            setSize(response.data.data);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!selectedSize) {
                alert("Pilih Size");
                return;
            }

            const data = {
                product_id: id,
                size_id: selectedSize,
                stock: stock,
            };
            const response = await api.post("/productsize", data);

            alert(response.data.message);
            navigate("/admin/productmanagement");

        } catch (error) {
            setMessage(
                error.response?.data?.message || error.message
            );
        }
    }

    useEffect(() => {
        getSizes();
    }, [])



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
                                <p className="font-oswald text-2xl">
                                    Create Product Size
                                </p>

                                <hr className="mt-5 text-[#737373]" />

                                <div className="mt-5">
                                    <div className="mt-5">
                                        <label className="font-inter">
                                            Size
                                        </label>

                                        <select value={selectedSize || ""} onChange={(e) => setSelectedSize(e.target.value)} className="w-full font-inter bg-[#f3f3f3] rounded-xl p-3 border border-[#737373]">
                                            <option value="">
                                                Select Size
                                            </option>
                                            {
                                                size.map((s) => (
                                                    <option key={s.id} value={s.id}>
                                                        {s.sizeName}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    {/* Stock */}
                                    <div className="mt-2">
                                        <label className="font-inter">
                                            Stock
                                        </label>

                                        <input
                                            type="number"
                                            placeholder="Masukkan jumlah stock"
                                            className="w-full font-inter bg-[#f3f3f3] rounded-xl p-3 border border-[#737373]"
                                            onChange={(e) =>
                                                setStock(e.target.value)
                                            }
                                        />
                                    </div>

                                    {/* Error Message */}

                                    {message && (
                                        <p className="text-red-500 mt-4">
                                            {message}
                                        </p>
                                    )}



                                    <div className="flex justify-center gap-2 mt-5">
                                        <button type="submit" className="rounded-xl border border-[#E5E5E5] font-inter text-white w-100 font-bold p-2 text-sm bg-black">
                                            Save Changes
                                        </button>
                                        <Link to="/admin/productmanagement">
                                            <button type="button" className="rounded-xl border border-[#737373] font-inter text-black w-100 font-bold p-2 text-sm bg-[#f8f8f8]">
                                                Cancel
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}