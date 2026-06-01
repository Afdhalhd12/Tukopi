import { Navigate, Outlet } from "react-router-dom";
import Swal from "sweetalert2";

export default function ProtectedRoute() {
    const token = localStorage.getItem("token");

    if (!token) {
        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "warning",
            title: "Akses Ditolak",
            text: "Silahkan login terlebih dahulu",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        });
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}