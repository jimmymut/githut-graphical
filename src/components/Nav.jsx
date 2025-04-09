import { Link } from "react-router-dom";

export function Nav(){
    return(
        <div className="bg-blue-500 flex items-center justify-between px-10">
            <Link to="/" className="uppercase text-white w-fit font-bold text-3xl">Logo</Link>
            <nav className="flex gap-3 text-white">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/posts">Posts</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
            </nav>
        </div>
    )
}