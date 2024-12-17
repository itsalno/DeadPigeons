import {Link, useNavigate} from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import {useAtom} from "jotai";
import {isLoggedInAtom} from "../Atoms/AuthAtom";
import {jwtDecode} from "jwt-decode";
import Hamburger from 'hamburger-react'
import {useState} from "react";
import '../CSS/NavStyle.css';


interface JwtPayload {
    sub: string;
    name: string;
    role: string;
    iat: number;
    exp: number;
}


export default function Navigation() {

    const [isOpen, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
    const navigate = useNavigate();

    let userRole = null
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            userRole = decoded.role;
        } catch (err) {
            console.error("Invalid token");
        }
    }

    const handleLogOut = () => {
        localStorage.clear();
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        navigate("/");
    };


    return (
        <div className="navbar bg-base-100 h-16 min-h-[4rem]">
            <div className="flex-1">

                <button className="hamburger" onClick={() => setOpen(!isOpen)}>
                    <Hamburger/>
                </button>

                {isOpen && (
                    <>
                        {isLoggedIn && (
                            <>
                                {userRole === "User" && (
                                    <>
                                        <button className="btn btn-ghost small-case text-l m-1 mob">
                                            <Link to="/Games">
                                                Play
                                            </Link>
                                        </button>
                                        <button className="btn btn-ghost small-case text-l m-1 mob">
                                            <Link to="/Balance">
                                                Balance
                                            </Link>
                                        </button>
                                    </>
                                )}

                                {userRole === "Admin" && (
                                    <>
                                        <Link to="/Users" className="btn btn-ghost small-case text-l m-1 mob">Players
                                            (Admin)</Link>
                                        <Link to="/WiningNumbers" className="btn btn-ghost small-case text-l m-1 mob">Wining
                                            Numbers
                                            (Admin)</Link>
                                        <Link to="/History" className="btn btn-ghost small-case text-l m-1 mob">History
                                            (Admin)</Link>
                                        <Link to="/Winners" className="btn btn-ghost small-case text-l m-1 mob">Winners
                                            (Admin)</Link>
                                    </>
                                )}

                                <button
                                    onClick={handleLogOut}
                                    className="btn btn-ghost small-case text-l m-1 mob"
                                >
                                    Log Out
                                </button>
                            </>
                        )}
                    </>
                )}

                {isLoggedIn && (
                    <>
                        {userRole === "User" && (
                            <>
                                <Link to="/Games" className="btn btn-ghost small-case text-l m-1">Play</Link>
                                <Link to="/Balance" className="btn btn-ghost small-case text-l m-1">Balance</Link>
                            </>
                        )}

                        {userRole === "Admin" && (
                            <>
                                <Link to="/Users" className="btn btn-ghost small-case text-l m-1">Players (Admin)</Link>
                                <Link to="/WiningNumbers" className="btn btn-ghost small-case text-l m-1">Wining Numbers
                                    (Admin)</Link>
                                <Link to="/History" className="btn btn-ghost small-case text-l m-1">History
                                    (Admin)</Link>
                                <Link to="/Winners" className="btn btn-ghost small-case text-l m-1">Winners
                                    (Admin)</Link>
                            </>
                        )}

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
                <ThemeSwitcher/>
            </div>
            <div className="flex-none">
                {isOpen && (
                    <>
                        <div>
                            {!isLoggedIn && (
                                <button className="btn btn-ghost small-case text-l m-1 mob">
                                    <Link to="/LogIn">Log In</Link>
                                </button>
                            )}
                        </div>
                    </>
                )}
                <div>
                    {!isLoggedIn && (
                        <button className="btn btn-ghost small-case text-l m-1 mob">
                            <Link to="/LogIn">Log In</Link>
                        </button>
                    )}
                </div>
            </div>

        </div>
    );
}