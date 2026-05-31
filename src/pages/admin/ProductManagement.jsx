import { useState } from "react";
import AdminBar from "../../components/AdminBar";
import SideBar from "../../components/SideBar";
import { useEffect } from "react";
import api from "../../utils/API";
import PaginationComp from "../../components/PaginationComp";
import SearchComp from "../../components/SearchComp";
import { Link } from "react-router-dom";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";

export default function ProductManagement() {

    const [products, setProducts] = useState(null);
    const [search, setSearch] = useState("");
    const [totalProducts, setTotalProducts] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState({
        sortBy: "",
        order: "",
    });

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    function processSearch(event) {
        setSearch(event.target.value);
        setCurrentPage(1);
    }

    async function getProducts() {

        try {
            let url = `/product?limit=5&page=${currentPage}`;

            if (search) {
                url += `&name=${search}`;
            }

            if (sort.sortBy && sort.order) {
                url += "&sortBy=" + sort.sortBy + "&order=" + sort.order;
            }



            const response = await api.get(url);

            setProducts(response.data.data.data);
            setTotalProducts(response.data.data.total);




        } catch (error) {
            console.log(error.message);
        }
    }

    async function handleDelete(id) {
        const confirmDelete = window.confirm("Yakin ingin menghapus product ini?");

        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete(`/product/${id}`);

            // prev digunakan untuk mengambil hasil state sebelumnya
            setProducts((prev) => prev.filter((item) => item.id !== id));

            alert("Product berhasil dihapus");
        } catch (error) {
            console.log(error.response?.data || error.message);
            alert("Gagal menghapus product");
        }
    }

    useEffect(() => {
        getProducts();
    }, [currentPage, search, sort]);

    if (!products) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <div className="bg-[#f8f8f8] min-h-screen">

                <div className="grid grid-cols-8 ">
                    <div className="col-span-2">
                        <AdminBar />
                    </div>

                    <div className="col-span-6 mt-20 p-8">
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

                            {/* Header */}
                            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 gap-5">
                                <SearchComp processSearch={processSearch} />
                                <div className="flex items-center gap-2">
                                    <button className="text-sm text-gray-600 border border-gray-300 rounded-md px-3 py-1.5">Filter</button>
                                    <select onChange={(e) => {
                                        const value = e.target.value;

                                        if (value === "nameASC") {
                                            setSort({
                                                sortBy: "name",
                                                order: "ASC",
                                            });
                                        }
                                        else if (value === "priceASC") {
                                            setSort({
                                                sortBy: "price",
                                                order: "ASC",
                                            });
                                        }
                                        else if (value === "nameDESC") {
                                            setSort({
                                                sortBy: "name",
                                                order: "DESC",
                                            });
                                        }
                                        else if (value === "priceDESC") {
                                            setSort({
                                                sortBy: "price",
                                                order: "DESC",
                                            });
                                        }
                                        else {
                                            setSort({
                                                sortBy: "",
                                                order: "",
                                            });
                                        }

                                        setCurrentPage(1);
                                    }}
                                        className="text-sm text-gray-600 border border-gray-300 rounded-md px-3 py-1.5 outline-none"
                                    >
                                        <option value="nameASC">Sort by Product A-Z</option>
                                        <option value="priceDESC">Sort by Highest Price</option>
                                        <option value="nameDESC">Sort by Product Z-A</option>
                                        <option value="priceASC">Sort by Lowest Price</option>

                                    </select>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-500">Total Products: <b className="text-gray-800">{totalProducts}</b></span>
                                    <button className="text-sm font-semibold text-gray-700 border border-gray-300 rounded-lg px-4 py-1.5">↓ Export Product</button>
                                </div>
                            </div>

                            {/* Table */}
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <tr>
                                        <th className="text-left px-5 py-3">Products</th>
                                        <th className="text-left px-5 py-3">Brand</th>
                                        <th className="text-left px-5 py-3">Category</th>
                                        <th className="text-left px-5 py-3">Price</th>
                                        <th className="text-left px-5 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {products.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50">
                                            <td className="px-5 py-4">
                                                <div className="flex gap-4">
                                                    <img src={product.image} className="w-10 h-10 rounded-full" />
                                                    <div className="flex items-center">
                                                        <p className="font-semibold text-gray-800">{product.name}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 text-gray-500">{product.brand}</td>
                                            <td className="px-5 py-4 text-gray-500">{product.category}</td>
                                            <td className="px-5 py-4">
                                                <span className="text-xs font-semibold px-2.5 py-1 rounded border border-gray-200 bg-gray-100 text-gray-700">Rp. {product.price.toLocaleString('id-ID')}</span>
                                            </td>

                                            <td className="px-5">
                                                <div className="flex gap-2">
                                                    <Link to={`/admin/updateproduct/${product.id}`}>
                                                        <button className="w-8 h-8 border border-[#E5E5E5] bg-[#f8f8f8] rounded-xl flex items-center justify-center hover:bg-[#E5E5E5] transition">
                                                            <MdOutlineEdit size={15} className="text-[#737373]" />
                                                        </button>
                                                    </Link>
                                                    <Link to={`/admin/productmanagement/${product.id}/stock`}>
                                                        <button className="w-8 h-8 border border-[#E5E5E5] bg-[#f8f8f8] rounded-xl flex items-center justify-center hover:bg-[#E5E5E5] transition">
                                                            <IoIosAdd size={15} className="text-[#737373]" />
                                                        </button>
                                                    </Link>
                                                    <button onClick={(e) => handleDelete(product.id)} className="w-8 h-8 border border-[#E5E5E5] bg-[#f8f8f8] rounded-xl flex items-center justify-center hover:bg-red-50 transition">
                                                        <MdOutlineDelete size={15} className="text-red-500" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            <div className="flex items-center justify-between px-5 py-3 border-t border-gray-200">
                                <p className="text-sm text-gray-500">Showing {products.length} to 5 of {totalProducts} Products</p>
                                <div className="flex items-center gap-1">
                                    <PaginationComp currentPage={currentPage} onPageChange={onPageChange} />
                                </div>
                            </div>

                        </div>
                    </div>


                </div>




            </div>
        </>
    )
}