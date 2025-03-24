import { useState } from "react";
import { Link } from "react-router-dom";
import { AlignJustify, X } from "react-feather";

const DashboardLayout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    return (
        <div className="flex min-h-screen">
            <aside className={`bg-blue-900 h-screen top-0 text-white w-64 p-4 space-y-4 transition-transform ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 fixed md:relative lg:sticky`}>
                <button className="md:hidden text-white" onClick={() => setIsOpen(false)}>
                    <X className="w-8 h-8" />
                </button>
                <h2 className="text-2xl font-bold mb-4 pl-4">Dashboard</h2>
                <nav className="space-y-2 text-xl">
                    <Link to="/dashboard/ticket" className="flex items-center space-x-3 p-4 hover:bg-blue-700 rounded-md transition text-white">
                        <span>Ticket</span>
                    </Link>
                    <Link to="/dashboard/booking" className="flex items-center space-x-3 p-4 hover:bg-blue-700 rounded-md transition text-white">
                        <span>Booking</span>
                    </Link>
                    <Link to="/dashboard/flight" className="flex items-center space-x-3 p-4 hover:bg-blue-700 rounded-md transition text-white">
                        <span>Flight</span>
                    </Link>
                    <Link onClick={handleLogout} className="flex items-center space-x-3 p-4 hover:bg-blue-700 rounded-md transition text-white">
                        <span>Logout</span>
                    </Link>
                </nav>
            </aside>
            <main className="flex-1 bg-gray-100 min-h-screen p-4 md:ml-0 md:p-10">
                <button className="md:hidden mb-4" onClick={() => setIsOpen(true)}>
                    <AlignJustify className="w-8 h-8" />
                </button>
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
