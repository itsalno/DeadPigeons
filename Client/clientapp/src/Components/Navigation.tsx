import { Link, useNavigate } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "../Atoms/AuthAtom";

export default function Navigation() {

    const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
    

    

    const handleLogOut = () => {
        localStorage.removeItem('balance')
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('token');
        localStorage.removeItem('playerProfileId');
        setIsLoggedIn(false);
    };
    
    
    return (
        <div className="navbar bg-base-100 h-16 min-h-[4rem]">
            <div className="flex-1">
                {!isLoggedIn && (
                    <Link to="/" className="btn btn-ghost small-case text-l m-1">Home</Link>
                )}
                {isLoggedIn && (
                    <>
                        <Link to="/Games" className="btn btn-ghost small-case text-l m-1">Play</Link>
                        <Link to="/Users" className="btn btn-ghost small-case text-l m-1">Players (Admin)</Link>
                        <Link to="/WiningNumbers" className="btn btn-ghost small-case text-l m-1">Wining Numbers (Admin)</Link>
                        <Link to="/History" className="btn btn-ghost small-case text-l m-1">History (Admin)</Link>
                        <Link to="/Balance" className="btn btn-ghost small-case text-l m-1">Balance</Link>
                        <button
                            onClick={handleLogOut}
                            className="btn btn-ghost small-case text-l m-1"
                        >
                            Log Out
                        </button>
                    </>
                )}
            </div>
            <div className="flex-none">
                <ThemeSwitcher />
            </div>
            <div className="flex-none">
                {!isLoggedIn && (
                    <Link to="/LogIn" className="btn btn-ghost small-case text-l m-1" >Log In</Link>
                )}
            </div>
        </div>
    );
}