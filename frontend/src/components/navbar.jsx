import { Link } from "react-router-dom";


const Navbar = () => {

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    return (
        <nav className="fixed top-0 left-0 w-full h-max bg-white p-5 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <h3 className="text-3xl font-bold">Airport System</h3>
                </div>
                <div>
                    <ul className="flex gap-10 text-2xl font-semibold">
                        <li> <Link to="/">Home</Link> </li>
                        <li> <Link to="/history">History</Link> </li>
                    </ul>
                </div>
                <div className="flex gap-5 text-2xl font-semibold">
                    {
                        localStorage.getItem("token") ?
                            <button onClick={handleLogout}>Logout</button>
                            :
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                            </>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;