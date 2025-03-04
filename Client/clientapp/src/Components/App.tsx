import { useAtom } from "jotai";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import {Route, Routes, useNavigate} from "react-router-dom";
import { ThemeAtom } from "../Atoms/ThemeAtom";
import Navigation from "./Navigation";
import IntroPage from "../Pages/IntroPage";
import GamesPage from "../Pages/GamesPage";
import WiningNubers from "../Pages/WiningNumbers";
import WinnersPage from "../Pages/WinnersPage";
import BalancePage from "../Pages/BalancePage";
import InactiveUsersPage from "../Pages/InactiveUsersPage";
import LogInPage from "../Pages/LogInPage";
import PlayersPage from "../Pages/PlayersPage";
import HistoryOfGames from "../Pages/HistoryOfGames";
import TransactionHistoryPage from "../Pages/TransactionHistoryPage";
import RegisterUserPage from "../Pages/RegisterUserPage";
import DetailGameHistoryPage from "../Pages/DetailGameHistoryPage";
import ProtectedRoute from "./ProtectedRoute";
import ResetPasswordPage from "../Pages/ResetPasswordPage";
import { jwtDecode } from "jwt-decode";
import { isLoggedInAtom } from "../Atoms/AuthAtom";

interface JwtPayload {
    sub: string;
    name: string;
    role: string;
    iat: number;
    exp: number;
}


const App = () => {
    const [theme] = useAtom(ThemeAtom);
    const [, setIsLoggedIn] = useAtom(isLoggedInAtom);
    const navigate = useNavigate();
    
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode<JwtPayload>(token);
                const now = Math.floor(Date.now() / 1000); 

                if (decoded.exp > now) {
                    setIsLoggedIn(true);
                } else {
                    localStorage.clear(); 
                    setIsLoggedIn(false);
                }
            } catch (err) {
                console.error("Invalid token");
                localStorage.clear(); 
                setIsLoggedIn(false);
                navigate("/")
            }
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <>
            <Navigation />
            <Toaster position={"bottom-center"} />
            <Routes>
                {/* Everybody */}
                <Route path="/" element={<IntroPage />} />
                <Route path="/LogIn" element={<LogInPage />} />
                <Route path="/ResetPass" element={<ResetPasswordPage />} />

                {/* User */}
                <Route path="/Games" element={<ProtectedRoute requiredRole="User"><GamesPage /></ProtectedRoute>} />
                <Route path="/Balance" element={<ProtectedRoute requiredRole="User"><BalancePage /></ProtectedRoute>} />

                {/*Admin*/}
                <Route path="/Users" element={<ProtectedRoute requiredRole="Admin"><PlayersPage /></ProtectedRoute>} />
                <Route path="/WiningNumbers" element={<ProtectedRoute requiredRole="Admin"><WiningNubers /></ProtectedRoute>} />
                <Route path="/Winners" element={<ProtectedRoute requiredRole="Admin"><WinnersPage /></ProtectedRoute>} />
                <Route path="/History" element={<ProtectedRoute requiredRole="Admin"><HistoryOfGames /></ProtectedRoute>} />
                <Route path="/players/:playerId/transactions" element={<ProtectedRoute requiredRole="Admin"><TransactionHistoryPage /></ProtectedRoute>} />
                <Route path="/RegisterUser" element={<ProtectedRoute requiredRole="Admin"><RegisterUserPage /></ProtectedRoute>} />
                <Route path="/InactiveUsers" element={<ProtectedRoute requiredRole="Admin"><InactiveUsersPage /></ProtectedRoute>} />
                <Route path="/game/:gameId/detailHistory" element={<ProtectedRoute requiredRole="Admin"><DetailGameHistoryPage /></ProtectedRoute>} />
            </Routes>
        </>
    );
};

export default App;
