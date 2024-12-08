import { useAtom } from "jotai";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
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
import { isLoggedInAtom } from "../Atoms/AuthAtom";
import RegisterUserPage from "../Pages/RegisterUserPage";
import DetailGameHistoryPage from "../Pages/DetailGameHistoryPage";
import ProtectedRoute from "./ProtectedRoute";
import ResetPasswordPage from "../Pages/ResetPasswordPage";


const App = () => {
    const [theme, setTheme] = useAtom(ThemeAtom);
    const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);

    useEffect(() => {
        setIsLoggedIn(false)
        /*const loggedInStatus = localStorage.getItem('isLoggedIn');

        if (loggedInStatus === 'true') {
            setIsLoggedIn(true); // Update atom state
        }*/
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
