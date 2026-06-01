import AdminBar from "../../components/AdminBar";
import { useState, useEffect } from "react";
import api from "../../utils/API";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
// register elemenr chart agar bisa dipakai
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
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

    // Buat itung berapa total nya
    const deliveredTotal = orders.filter(order => order.status === "delivered").length;
    const processingTotal = orders.filter(order => order.status === "processing").length;
    const pendingTotal = orders.filter(order => order.status === "pending").length;
    const cancelledTotal = orders.filter(order => order.status === "cancelled").length;

    const totalOrders = orders.length || 1;
    // Buat persenan nya nanti
    const deliveredPercent = Math.round((deliveredTotal / totalOrders) * 100);
    const processingPercent = Math.round((processingTotal / totalOrders) * 100);
    const pendingPercent = Math.round((pendingTotal / totalOrders) * 100);
    const cancelledPercent = Math.round((cancelledTotal / totalOrders) * 100);

    // Bikin object kosong untuk nyimpen total penjualan per brand
    const brandSales = {};

    // Looping data order 
    validOrders.forEach((order) => {
        order.items?.forEach((item) => {
            const brandName = item.ProductSize?.Product?.brand || "Brand Unknown";
            const qty = item.qty || 1;

            // Kalau brand udah ada di object, tambahin qty-nya. Kalau belum, bikin baru.
            if (brandSales[brandName]) {
                brandSales[brandName] += qty;
            } else {
                brandSales[brandName] = qty;
            }
        });
    });

    // Urutin brand dari yang paling banyak dibeli ke paling sedikit, lalu ambil top 5 aja biar chart gak kepenuhan
    const sortedBrands = Object.keys(brandSales).sort((a, b) => brandSales[b] - brandSales[a]);
    const topBrands = sortedBrands.slice(0, 5); // Ambil 5 brand teratas

    //  Siapin data untuk Chart.js
    const chartData = {
        labels: topBrands, // Sumbu X (Nama Brand)
        datasets: [
            {
                label: "Jumlah Produk Terjual",
                data: topBrands.map(brand => brandSales[brand]), // Sumbu Y (Jumlah Qty)
                backgroundColor: "rgba(96, 165, 250, 0.5)", // Warna Bar (Tailwind blue-400 tp transparan dikit)
                borderColor: "rgb(59, 130, 246)", // Border Bar (Tailwind blue-500)
                borderWidth: 1,
                borderRadius: 4, // Biar ujung bar-nya agak melengkung dikit (opsional)
            },
        ],
    };

    // 7. Siapin opsi untuk styling Chart
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false, // Biar tinggi chart bisa di atur manual via div parent
        plugins: {
            legend: {
                position: "top",
                labels: {
                    font: { family: "'Inter', sans-serif" }
                }
            },
            title: {
                display: false, 
            },
        },
        scales: {
            y: {
                beginAtZero: true, // Sumbu Y harus mulai dari 0
                ticks: {
                    stepSize: 1 // Biar angkanya genap (1, 2, 3), bukan desimal (1.5)
                }
            }
        }
    };

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


                    <div>
                        <h1 className="text-xl font-bold text-gray-800 font-oswald">Dashboard</h1>
                        <p className="text-sm text-gray-400 mt-0.5 font-inter">Overview penjualan & manajemen pesanan</p>
                    </div>


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


                    <div className="grid grid-cols-8 gap-4">
                        <div className="col-span-5 bg-white rounded-xl border border-gray-200 p-5">
                            <h2 className="text-sm font-bold text-gray-800 mb-1 font-oswald">Brand Terlaris</h2>
                            <p className="text-xs text-gray-400 mb-4 font-inter">Top 5 brand paling banyak dibeli</p>
                            <div className="relative h-64 w-full">
                                {topBrands.length > 0 ? (
                                    <Bar data={chartData} options={chartOptions} />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400 font-inter text-sm">
                                        Belum ada data penjualan brand
                                    </div>
                                )}
                            </div>
                        </div>


                        <div className="col-span-3 bg-white rounded-xl border border-gray-200 p-5">
                            <h2 className="text-sm font-bold text-gray-800 mb-1 font-oswald">Status Pesanan</h2>
                            <p className="text-xs text-gray-400 mb-4 font-inter">Distribusi Pesanan</p>
                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span className="font-medium font-inter">Delivered</span>
                                        <span className="font-inter">{deliveredPercent}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div className="bg-green-400 h-2 rounded-full" style={{ width: `${deliveredPercent}%` }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span className="font-medium font-inter">Processing</span>
                                        <span className="font-inter">{processingPercent}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${processingPercent}%` }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span className="font-medium font-inter">Pending</span>
                                        <span className="font-inter">{pendingPercent}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${pendingPercent}%` }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span className="font-medium font-inter">Cancelled</span>
                                        <span className="font-inter">{cancelledPercent}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div className="bg-red-400 h-2 rounded-full" style={{ width: `${cancelledPercent}%` }} />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 pt-4 border-t border-gray-100">
                                <p className="text-xs text-gray-400 font-inter">Total pesanan</p>
                                <p className="text-2xl font-bold text-gray-800 font-oswald">{orders.length}</p>
                            </div>
                        </div>
                    </div>


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