import { Link, useNavigate, useParams } from "react-router-dom";
import qris from "../assets/qris.jpeg";
import { useEffect, useState } from "react";
import api from "../utils/API";
import Swal from "sweetalert2";
export default function PaymentPage() {
    const { id } = useParams();
    const [status, setStatus] = useState("processing");
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();

    async function getOrders() {
        try {
            const response = await api.get(`/order/foruser/${id}`);
            setOrder(response.data.data);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }


     async function handleSubmit(e) {
        e.preventDefault();
        try {
            const data = {
                status: status
            };

            const response = await api.patch(`/order/paymentupdate/${id}`, data);

            await Swal.fire({
                icon: "success",
                title: "Berhasil Memperbarui Product",
                text: "Sampai jumpa kembali!",
                timer: 1500,
                showConfirmButton: false,
            });

            navigate("/profile");

        } catch (error) {
            console.log(error.response?.data);
            console.log(error.response?.status);

        }
    }

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12 font-inter">
                <div className="bg-white border border-gray-100 rounded-2xl p-8 w-full max-w-sm flex flex-col items-center gap-6">

                    <div className="text-center">
                        <p className="font-oswald text-xs font-medium tracking-widest uppercase text-gray-400 mb-1">Scan to Pay</p>
                        <h1 className="font-oswald text-3xl font-semibold tracking-tight text-gray-900">Pembayaran</h1>
                    </div>

                    <div className="p-3 border border-gray-100 rounded-xl">
                        <img
                            src={qris}
                            alt="QR Code"
                            className="w-full h-60 rounded-lg"
                        />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap justify-center">
                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-500">QRIS</span>
                    </div>

                    <div className="w-full border-t border-gray-100"></div>

                    <div className="w-full flex justify-between items-baseline">
                        <span className="text-sm text-gray-500">Total Pembayaran</span>
                        <span className="font-oswald text-2xl text-gray-900 tracking-tight">Rp. {order?.totalPrice?.toLocaleString("id-ID") || 0}</span>
                    </div>

                    <button type="submit" className="w-full py-3.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:opacity-80 active:scale-[0.99] transition-all">
                        Saya Sudah Bayar
                    </button>
                    <Link to="/orderhistory">
                        <p className="text-xs text-gray-400">Bayar Nanti</p>
                    </Link>

                </div>
            </div>
        </form>
    )
}