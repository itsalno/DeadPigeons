import { useAtom } from "jotai";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import {Route, Routes } from "react-router-dom";
import { ThemeAtom } from "../Atoms/ThemeAtom";
import Navigation from "./Navigation";





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
        </Routes>

    </>)
}
export default App;