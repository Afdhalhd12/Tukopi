import AdminBar from "../../components/AdminBar";
import { useState, useEffect } from "react";
import api from "../../utils/API";

export default function Dashboard() {
    const [orders, setOrders] = useState([]);

    async function getOrders() {
        try {
            const response = await api.get("/order");
            setOrders(response.data.data);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

    async function handleUpdateStatus(id, status) {
        try {
            await api.patch(`/order/paymentupdate/${id}`, { status });
            getOrders();
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

    const validOrders = orders.filter(
        (order) => !['pending', 'cancelled'].includes(order.status)
    );

    const totalOrder = validOrders.length;
    const revenue = validOrders.reduce((sum, order) => sum + order.totalPrice, 0);
    const process = orders.filter((order) => order.status === "processing");
    const cancelled = orders.filter((order) => order.status === "cancelled");
    const totalProcess = process.length;
    const totalCancelled = cancelled.length;

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <div className="bg-[#f8f8f8] min-h-screen">
            <div className="grid grid-cols-8">
                <div className="col-span-2">
                    <AdminBar />
                </div>

                <div className="col-span-6 mt-20 p-8 space-y-6">

                    {/* Title */}
                    <div>
                        <h1 className="text-xl font-bold text-gray-800 font-oswald">Dashboard</h1>
                        <p className="text-sm text-gray-400 mt-0.5 font-inter">Overview penjualan & manajemen pesanan</p>
                    </div>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider font-inter">Total Orders</p>
                            <p className="text-3xl font-bold text-gray-800 mt-3 font-oswald">{totalOrder}</p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider font-inter">Revenue</p>
                            <p className="text-2xl font-bold text-gray-800 mt-3 font-oswald">Rp. {revenue.toLocaleString('id-ID')}</p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider font-inter">Processing</p>
                            <p className="text-3xl font-bold text-blue-400 mt-1 font-oswald">{totalProcess}</p>
                            <p className="text-xs text-gray-400 mt-1 font-inter">Menunggu diproses</p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider font-inter">Cancelled</p>
                            <p className="text-3xl font-bold text-red-400 mt-1 font-oswald">{totalCancelled}</p>
                            <p className="text-xs text-gray-400 mt-1 font-inter">Total dibatalkan</p>
                        </div>
                    </div>

                    {/* Chart + Status */}
                    <div className="grid grid-cols-8 gap-4">

                        {/* Bar Chart */}
                        <div className="col-span-5 bg-white rounded-xl border border-gray-200 p-5">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-sm font-bold text-gray-800 font-oswald">Penjualan per Bulan</h2>
                                    <p className="text-xs text-gray-400 font-inter">Januari – Juni 2025</p>
                                </div>
                                <span className="text-xs bg-[#D4F931] text-gray-800 font-semibold px-3 py-1 rounded-full font-inter">2025</span>
                            </div>
                            <div className="flex items-end gap-3 h-40">
                                <div className="flex-1 flex flex-col items-center gap-1">
                                    <span className="text-[10px] text-gray-400 font-inter">$6.2k</span>
                                    <div className="w-full bg-[#0A0A0A] rounded-t-lg" style={{ height: "60%" }} />
                                    <span className="text-xs text-gray-500 font-inter">Jan</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center gap-1">
                                    <span className="text-[10px] text-gray-400 font-inter">$4.8k</span>
                                    <div className="w-full bg-[#0A0A0A] rounded-t-lg" style={{ height: "45%" }} />
                                    <span className="text-xs text-gray-500 font-inter">Feb</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center gap-1">
                                    <span className="text-[10px] text-gray-400 font-inter">$8.1k</span>
                                    <div className="w-full bg-[#0A0A0A] rounded-t-lg" style={{ height: "75%" }} />
                                    <span className="text-xs text-gray-500 font-inter">Mar</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center gap-1">
                                    <span className="text-[10px] text-gray-400 font-inter">$5.9k</span>
                                    <div className="w-full bg-[#0A0A0A] rounded-t-lg" style={{ height: "55%" }} />
                                    <span className="text-xs text-gray-500 font-inter">Apr</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center gap-1">
                                    <span className="text-[10px] text-gray-400 font-inter">$9.7k</span>
                                    <div className="w-full bg-[#D4F931] rounded-t-lg" style={{ height: "90%" }} />
                                    <span className="text-xs text-gray-500 font-inter">Mei</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center gap-1">
                                    <span className="text-[10px] text-gray-400 font-inter">$7.5k</span>
                                    <div className="w-full bg-[#0A0A0A] rounded-t-lg" style={{ height: "70%" }} />
                                    <span className="text-xs text-gray-500 font-inter">Jun</span>
                                </div>
                            </div>
                        </div>

                        {/* Status Distribution */}
                        <div className="col-span-3 bg-white rounded-xl border border-gray-200 p-5">
                            <h2 className="text-sm font-bold text-gray-800 mb-1 font-oswald">Status Pesanan</h2>
                            <p className="text-xs text-gray-400 mb-4 font-inter">Distribusi bulan ini</p>
                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span className="font-medium font-inter">Delivered</span>
                                        <span className="font-inter">66%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div className="bg-green-400 h-2 rounded-full" style={{ width: "66%" }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span className="font-medium font-inter">Processing</span>
                                        <span className="font-inter">17%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div className="bg-blue-400 h-2 rounded-full" style={{ width: "17%" }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span className="font-medium font-inter">Pending</span>
                                        <span className="font-inter">15%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "15%" }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span className="font-medium font-inter">Cancelled</span>
                                        <span className="font-inter">3%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div className="bg-red-400 h-2 rounded-full" style={{ width: "3%" }} />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 pt-4 border-t border-gray-100">
                                <p className="text-xs text-gray-400 font-inter">Total pesanan</p>
                                <p className="text-2xl font-bold text-gray-800 font-oswald">-</p>
                            </div>
                        </div>
                    </div>

                    {/* Order Table */}
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
                            <div>
                                <h2 className="text-sm font-bold text-gray-800 font-oswald">Manajemen Pesanan</h2>
                                <p className="text-xs text-gray-400 font-inter">Update status pesanan pelanggan</p>
                            </div>
                        </div>

                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <tr>
                                    <th className="text-left px-5 py-3 font-inter">Order ID</th>
                                    <th className="text-left px-5 py-3 font-inter">Customer</th>
                                    <th className="text-left px-5 py-3 font-inter">Produk</th>
                                    <th className="text-left px-5 py-3 font-inter">Total</th>
                                    <th className="text-left px-5 py-3 font-inter">Status</th>
                                    <th className="text-left px-5 py-3 font-inter">Update</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-5 py-4 font-mono text-xs text-gray-400 font-inter">
                                            #{order.id}
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="font-medium text-gray-800 font-inter">
                                                {order.User?.name}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-gray-500 font-inter">
                                            {order.items?.map((item) => (
                                                <div key={item.id}>
                                                    {item.ProductSize?.Product?.name}
                                                    {" - "}
                                                    Size {item.ProductSize?.Size?.sizeName}
                                                    {" x "}
                                                    {item.qty}
                                                </div>
                                            ))}
                                        </td>
                                        <td className="px-5 py-4 font-semibold text-gray-800 font-inter">
                                            Rp {order.totalPrice?.toLocaleString("id-ID")}
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`font-inter text-xs
                                                ${order.status === "processing" ? "rounded-full p-1.5 bg-blue-100 text-blue-700" : ""}
                                                ${order.status === "shipped" ? "rounded-full p-1.5 bg-purple-100 text-purple-700" : ""}
                                                ${order.status === "delivered" ? "rounded-full p-1.5 bg-green-100 text-green-700" : ""}
                                                ${order.status === "cancelled" ? "rounded-full p-1.5 bg-red-100 text-red-700" : ""}
                                            `}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                                className="text-xs text-gray-600 border border-gray-300 rounded-lg px-2 py-1.5 outline-none bg-white font-inter"
                                            >
                                                <option value="processing">Processing</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="px-5 py-3 border-t border-gray-200">
                            <p className="text-sm text-gray-400 font-inter">Total {orders.length} pesanan</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}