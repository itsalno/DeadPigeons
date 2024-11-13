import { Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navigation() {
    return (
        <div className="navbar bg-base-100 h-16 min-h-[4rem]">
            <div className="flex-1">
                <Link to ="/" className="btn btn-ghost small-case text-l m-1">Home</Link>
                <Link to ="/Games" className="btn btn-ghost small-case text-l m-1">Play</Link>
                <Link to ="/Users" className="btn btn-ghost small-case text-l m-1">Users</Link>
                <Link to ="/History" className="btn btn-ghost small-case text-l m-1">History of games</Link>
                <Link to ="/Balance" className="btn btn-ghost small-case text-l m-1">Balance</Link>

            </div>
            <div className="flex-none">
                <ThemeSwitcher/>
            </div>
            <div className="flex-none">
                <Link to="/LogIn" className="btn btn-ghost small-case text-l m-1">Log In</Link>
            </div>
        </div>
    );
}