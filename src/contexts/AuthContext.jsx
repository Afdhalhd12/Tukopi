    import { useState, createContext } from "react";

    //  context 
    export const AuthContext = createContext();

    // menyimpan proses data yang akan dibuat global (bisa diakses di file mana aja)
    export default function AuthProvider({ children }) {
        const [isLogin, setIsLogin] = useState(localStorage.getItem("token"));
        const [role, setRole] = useState(localStorage.getItem("role"));

        function logout() {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            setIsLogin(false);
            setRole(false);
        }

        function login() {
            // ubah state isLogin jadi data localStorage, untuk trigger munculnya btn logout di navbar
            setIsLogin(localStorage.getItem('token'));
            setRole(localStorage.getItem('role'));
            
        }

        // mendefinisikan context akan digunakan di pages apaa saja
        return (
            // value : data/function yang diperbolehkan diakses global
            <AuthContext.Provider value={{ isLogin, logout, login, role }}>
                {/* kalo gapake children, perlu manggil satu satu file page */}
                {children}
            </AuthContext.Provider>
        )
    }