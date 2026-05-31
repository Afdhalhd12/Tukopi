import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AdminBar from "../../components/AdminBar";
import api from "../../utils/API";
import { MdOutlineEdit } from "react-icons/md";
import { HiOutlinePlusSmall } from "react-icons/hi2";

export default function StockManagement() {
    const { id } = useParams();

    const [productSizes, setProductSizes] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [newStock, setNewStock] = useState(0);
    const [message, setMessage] = useState("");

    async function getProductSizes() {
        try {
            const response = await api.get(`/productsize/${id}`);
            setProductSizes(response.data.data);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

    function openModal(product) {
        setSelectedProduct(product);
        setNewStock(product.stock);
        setMessage("");
    }

    function closeModal() {
        setSelectedProduct(null);
        setMessage("");
    }

    async function handleSave() {
        try {
            const response = await api.put(`/productsize/${selectedProduct.id}`, {
                stock: newStock,
            });
            setProductSizes((prev) =>
                prev.map((p) =>
                    // ngecek iterasi kalau p.id === selected.id bakal bikin object baru, jadi yang diubah cuma yang id nya sama
                    p.id === selectedProduct.id ? { ...p, stock: newStock } : p
                )
            );
            alert(response.data.message);
            closeModal();
        } catch (error) {
            setMessage(error.response?.data?.message || error.message);
        }
    }

    useEffect(() => {
        getProductSizes();
    }, []);

    return (
        <div className="bg-[#f8f8f8] min-h-screen">
            <div className="grid grid-cols-8">
                <div className="col-span-2">
                    <AdminBar />
                </div>

                <div className="col-span-6 mt-20 p-8">
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

                        <div className="px-5 py-4 flex justify-between border-b">
                            <h1 className="font-oswald text-xl">Stock Management</h1>
                            <Link to={`/admin/productmanagement/${id}/ProductSize`}>
                                <button className="text-sm font-semibold text-gray-700 border border-gray-300 rounded-lg px-4 flex  py-1.5"><HiOutlinePlusSmall className="my-auto" /> Create Size</button>
                            </Link>
                        </div>

                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-oswald text-gray-500 uppercase tracking-wider">
                                <tr>
                                    <th className="text-left px-5 py-3">Size</th>
                                    <th className="text-left px-5 py-3">Stock</th>
                                    <th className="text-left px-5 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {productSizes.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="px-5 py-4">
                                            <span className="text-xs font-oswald px-2.5 py-1 rounded border border-gray-200 bg-gray-100 text-gray-700">
                                                {product.Size?.sizeName}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-gray-500">{product.stock}</td>
                                        <td className="px-5 py-4">
                                            <button
                                                onClick={() => openModal(product)}
                                                className="w-8 h-8 border border-[#E5E5E5] bg-[#f8f8f8] rounded-xl flex items-center justify-center hover:bg-[#E5E5E5] transition"
                                            >
                                                <MdOutlineEdit size={15} className="text-[#737373]" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            {selectedProduct && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl w-full max-w-sm shadow-lg">


                        <div className="flex items-center justify-between px-6 py-4 border-b">
                            <h2 className="font-oswald text-base">Update Stock</h2>
                            <button
                                onClick={closeModal}
                                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition"
                            >
                                ✕
                            </button>
                        </div>


                        <div className="px-6 py-5">


                            <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 mb-5">
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Size</p>
                                    <span className="text-xs font-oswald px-2.5 py-1 rounded border border-gray-200 bg-white text-gray-700">
                                        {selectedProduct.Size?.sizeName}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-400 mb-1">Stock saat ini</p>
                                    <p className="text-2xl font-bold text-gray-800">{selectedProduct.stock}</p>
                                </div>
                            </div>

                            {/* Input stock */}
                            <label className="block text-sm text-gray-500 mb-2">Jumlah Stock Baru</label>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    // pakai math.max buat ambil nilai terbesar biar ga minus
                                    onClick={() => setNewStock((v) => Math.max(0, v - 1))}
                                    className="w-9 h-9 rounded-xl border border-[#E5E5E5] bg-[#f8f8f8] flex items-center justify-center hover:bg-gray-200 transition text-lg font-medium"
                                >
                                    −
                                </button>
                                <input
                                    type="number"
                                    min={0}
                                    value={newStock}

                                    onChange={(e) => setNewStock(Math.max(0, parseInt(e.target.value) || 0))}
                                    className="flex-1 text-center border border-[#737373] rounded-xl py-2 text-base font-oswald bg-[#f3f3f3] focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setNewStock((v) => v + 1)}
                                    className="w-9 h-9 rounded-xl border border-[#E5E5E5] bg-[#f8f8f8] flex items-center justify-center hover:bg-gray-200 transition text-lg font-medium"
                                >
                                    +
                                </button>
                            </div>

                            {/* Diff label
                            {newStock !== selectedProduct.stock && (
                                <p className={`text-xs mt-2 ${newStock > selectedProduct.stock ? "text-green-500" : "text-red-500"}`}>
                                    {newStock > selectedProduct.stock
                                        ? `+${newStock - selectedProduct.stock} dari stock sebelumnya`
                                        : `${newStock - selectedProduct.stock} dari stock sebelumnya`}
                                </p>
                            )}

                            {message && (
                                <p className="text-red-500 text-xs mt-3">{message}</p>
                            )} */}
                        </div>


                        <div className="flex gap-2 px-6 py-4 border-t">
                            <button
                                onClick={closeModal}
                                className="flex-1 py-2 rounded-xl border border-[#737373] text-sm font-oswald bg-[#f8f8f8] hover:bg-gray-200 transition"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex-1 py-2 rounded-xl bg-black text-white text-sm font-oswald hover:bg-gray-800 transition"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}