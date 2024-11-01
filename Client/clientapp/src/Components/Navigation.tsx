import { Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navigation() {
    return (
        <div className="navbar bg-base-100 h-16 min-h-[4rem]">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost small-case text-xl m-2">Home</Link>

            </div>
            <div className="flex-none">
                <ThemeSwitcher/>
            </div>
        </div>
    );
}