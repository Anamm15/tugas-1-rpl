import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { getUserIdFromToken } from "../utils/getUserId";

const HistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isHistoryFetched, setIsHistoryFetched] = useState(false);
    const limit = 10;

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const userId = getUserIdFromToken();
                const response = await axios.get(`http://localhost:5000/booking/getBookingsPassenger/${userId}?page=${currentPage}&limit=${limit}`);
                if (response.status === 200) {
                    setHistory(response.data.bookings_history);
                    setTotalPages(response.data.totalPages);
                }
            } catch (error) {
                alert(error.response.data.message);
            }
        }

        if (!isHistoryFetched) {
            fetchHistory();
            setIsHistoryFetched(true);
        }
    }, [currentPage, isHistoryFetched]);

    return (
        <div>
            <Navbar />
            <main className="container mx-auto flex justify-center mt-32">
                {
                    history.length > 0 && (
                        <div>
                            <table className="text-center min-w-[800px] border border-gray-400">
                                <thead className="bg-gray-200 border-b border-gray-400">
                                    <tr>
                                        <th className="border border-gray-800 px-4 py-2">Booking ID</th>
                                        <th className="border border-gray-800 px-4 py-2">Seat</th>
                                        <th className="border border-gray-800 px-4 py-2">Booking Date</th>
                                        <th className="border border-gray-800 px-4 py-2">Payment Method</th>
                                        <th className="border border-gray-800 px-4 py-2">Price</th>
                                        <th className="border border-gray-800 px-4 py-2">Class</th>
                                        <th className="border border-gray-800 px-4 py-2">Baggage</th>
                                        <th className="border border-gray-800 px-4 py-2">Destination</th>
                                        <th className="border border-gray-800 px-4 py-2">Arrival Airport</th>
                                        <th className="border border-gray-800 px-4 py-2">Airline</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((booking, index) => (
                                        <tr 
                                            key={booking.id} 
                                            className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                                        >
                                            <td className="border border-gray-400 px-4 py-2">{booking.id}</td>
                                            <td className="border border-gray-400 px-4 py-2">{booking.seat}</td>
                                            <td className="border border-gray-400 px-4 py-2">{new Date(booking.booking_date).toLocaleString()}</td>
                                            <td className="border border-gray-400 px-4 py-2">{booking.payment_method}</td>
                                            <td className="border border-gray-400 px-4 py-2">{booking.ticket.price}</td>
                                            <td className="border border-gray-400 px-4 py-2">{booking.ticket.class}</td>
                                            <td className="border border-gray-400 px-4 py-2">{booking.ticket.baggage}</td>
                                            <td className="border border-gray-400 px-4 py-2">{booking.ticket.flight.destination}</td>
                                            <td className="border border-gray-400 px-4 py-2">{booking.ticket.flight.arrival_airport}</td>
                                            <td className="border border-gray-400 px-4 py-2">{booking.ticket.flight.aircraft.airline.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="mt-4 flex gap-5 items-center">
                                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="px-4 py-1 rounded-md bg-gray-300">
                                    Previous
                                </button>
                                <span> Page {currentPage} of {totalPages} </span>
                                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="px-4 py-1 rounded-md bg-gray-300">
                                    Next
                                </button>
                            </div>
                        </div>
                    )
                }
            </main>
        </div>
    )
}

export default HistoryPage;