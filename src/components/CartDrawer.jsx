import { useEffect, useState } from "react";
import api from "../utils/api.js";
import { Link } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

export default function CartDrawer({ isOpen, onClose }) {
    const [cart, setCart] = useState();

    async function getCarts() {
        try {
            const response = await api.get("/order/cart");
            setCart(response.data.data);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

    async function updateQty(orderItemId, qty) {
        try {
            await api.patch("/order/cart/qty", {
                order_item_id: orderItemId,
                qty,
            });

            getCarts();
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

    useEffect(() => {
        AOS.init({
            duration: 300,
            easing: "ease-out",
            once: false,
        });
    }, []);

    useEffect(() => {
        if (isOpen) {
            getCarts();

            setTimeout(() => {
                AOS.refresh();
            }, 50);
        }
    }, [isOpen]);

    return isOpen ? (
        <div className="fixed inset-0 z-50 flex">
            <div
                className="flex-1 bg-black/30 backdrop-blur-sm"
                onClick={onClose}
                data-aos="fade"
            />

            <div
                className="w-100 h-full bg-white flex flex-col"
                data-aos="fade-left"
            >
                <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E5E5]">
                    <div className="flex items-center gap-2">
                        <h2 className="font-oswald font-bold text-xl tracking-widest text-[#0A0A0A] uppercase">
                            Your Cart
                        </h2>

                        <span className="bg-[#D4F931] text-[#0A0A0A] text-xs font-bold px-2.5 py-0.5 rounded-full">
                            {cart?.items?.length || 0}
                        </span>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-9 h-9 flex items-center justify-center rounded-full border border-[#E5E5E5] text-[#737373] hover:bg-[#F5F5F5] transition-colors text-lg"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col divide-y divide-[#F0F0F0]">
                    {cart?.items?.map((item) => (
                        <div key={item.id} className="flex gap-4 py-4">
                            <div className="w-24 h-24 rounded-xl bg-[#F5F5F5] shrink-0 overflow-hidden">
                                <img
                                    src={item.ProductSize?.Product?.image}
                                    alt={item.ProductSize?.Product?.name}
                                    className="w-full h-full"
                                />
                            </div>

                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <p className="text-[10px] font-semibold tracking-widest text-[#737373] uppercase">
                                        {item.ProductSize?.Product?.brand}
                                    </p>

                                    <p className="text-sm font-semibold text-[#0A0A0A] mt-0.5">
                                        {item.ProductSize?.Product?.name}
                                    </p>

                                    <p className="text-xs text-[#737373] mt-1">
                                        Size:{" "}
                                        {
                                            item.ProductSize?.Size
                                                ?.sizeName
                                        }
                                    </p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center border border-[#E5E5E5] rounded-full overflow-hidden">
                                        <button
                                            onClick={() => {
                                                {
                                                    updateQty(
                                                        item.id,
                                                        item.qty -
                                                        1
                                                    );
                                                }
                                            }}
                                            className="w-8 h-8 flex items-center justify-center"
                                        >
                                            −
                                        </button>

                                        <span className="w-7 text-center text-sm font-medium">
                                            {item.qty}
                                        </span>

                                        <button
                                            onClick={() =>
                                                updateQty(
                                                    item.id,
                                                    item.qty +
                                                    1
                                                )
                                            }
                                            className="w-8 h-8 flex items-center justify-center"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <span className="text-sm font-bold">
                                        Rp{" "}
                                        {(
                                            item.price *
                                            item.qty
                                        ).toLocaleString(
                                            "id-ID"
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="px-6 py-5 border-t border-[#E5E5E5] flex flex-col gap-3">
                    <div className="flex justify-between text-sm text-[#737373]">
                        <span>
                            Subtotal (
                            {cart?.items?.length || 0})
                        </span>

                        <span>
                            Rp{" "}
                            {cart?.totalPrice?.toLocaleString(
                                "id-ID"
                            ) || "0"}
                        </span>
                    </div>

                    <div className="flex justify-between text-sm text-[#737373]">
                        <span>Pengiriman</span>

                        <span className="text-[#22c55e] font-semibold">
                            Gratis
                        </span>
                    </div>

                    <div className="h-px bg-[#F0F0F0]" />

                    <div className="flex justify-between items-center">
                        <span className="font-bold text-[#0A0A0A]">
                            Total
                        </span>

                        <span className="font-oswald font-bold text-xl text-[#0A0A0A] tracking-wide">
                            Rp{" "}
                            {cart?.totalPrice?.toLocaleString(
                                "id-ID"
                            ) || "0"}
                        </span>
                    </div>

                    <Link to="/checkout/cart">
                        <button onClick={onClose} className="w-full py-4 rounded-full bg-[#0A0A0A] text-white font-bold text-sm tracking-widest uppercase hover:bg-[#2a2a2a] transition-colors">
                            Checkout Sekarang
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    ) : null;
}