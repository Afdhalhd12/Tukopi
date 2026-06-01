import { Navigate, Outlet } from "react-router-dom";
import Swal from "sweetalert2";

export default function AdminRoute() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        Swal.fire({
            icon: "warning",
            title: "Login Diperlukan",
            text: "Silakan login terlebih dahulu",
        });

        return <Navigate to="/login" replace />;
    }

    if (role !== "admin") {
        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            title: "Akses Ditolak",
            text: "Halaman ini hanya untuk admin",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        });

        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}