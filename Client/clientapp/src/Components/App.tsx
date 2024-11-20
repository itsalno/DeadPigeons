import { useAtom } from "jotai";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import {Route, Routes } from "react-router-dom";
import { ThemeAtom } from "../Atoms/ThemeAtom";
import Navigation from "./Navigation";
import IntroPage from "../Pages/IntroPage";
import GamesPage from "../Pages/GamesPage";
import HistoryOfBoards from "../Pages/HistoryOfBoards";
import BalancePage from "../Pages/BalancePage";
import LogInPage from "../Pages/LogInPage";
import PlayersPage from "../Pages/PlayersPage";
import HistoryOfGames from "../Pages/HistoryOfGames";
import TransactionHistoryPage from "../Pages/TransactionHistoryPage";





const App = () => {

    const [theme, setTheme] = useAtom(ThemeAtom);

    useEffect(() => {
        
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme])

    return (<>

        <Navigation/>
        <Toaster position={"bottom-center"}/>
        <Routes>
            <Route path="/" element={<IntroPage/>}/>
            <Route path="/LogIn" element={<LogInPage/>}/>
            <Route path="/Games" element={<GamesPage />} />
            <Route path="/Users" element={<PlayersPage/>}/>
            <Route path="/History" element={<HistoryOfGames/>}/>
            <Route path="/Balance" element={<BalancePage/>} />
            <Route path="/players/:playerId/transactions" element={<TransactionHistoryPage />} />
        </Routes>

    </>)
}
export default App;