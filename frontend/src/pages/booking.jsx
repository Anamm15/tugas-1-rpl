import DashboardLayout from "../layouts/dashboard";
import { useEffect, useState } from "react";
import axios from 'axios';

const BookingPage = () => {
    const [bookings, setBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    useEffect(() => {
        const fetchAvailableTickets = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/booking/getAllBooking?page=${currentPage}&limit=${limit}`);
                if (response.status === 200) {
                    setBookings(response.data.bookings);
                    setTotalPages(response.data.totalPages);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAvailableTickets();
    }, [currentPage]);

    const deleteBooking = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/booking/deleteBooking/${id}`);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <DashboardLayout>
                <h1 className="font-semibold text-4xl mb-8">Booking List</h1>
                {
                    bookings.length > 0 && (
                        <div>
                            <table className="text-center min-w-[800px] border border-gray-400">
                                <thead className="bg-gray-200 border-b border-gray-400">
                                    <tr>
                                        <th className="border border-gray-800 px-4 py-2">ID</th>
                                        <th className="border border-gray-800 px-4 py-2">Seat</th>
                                        <th className="border border-gray-800 px-4 py-2">Booking Date</th>
                                        <th className="border border-gray-800 px-4 py-2">Payment Method</th>
                                        <th className="border border-gray-800 px-4 py-2">Passenger</th>
                                        <th className="border border-gray-800 px-4 py-2">Ticket</th>
                                        <th className="border border-gray-800 px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((booking, index) => (
                                        <tr 
                                            key={booking.id} 
                                            className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                                        >
                                            <td className="border border-gray-400 px-4 py-2">{booking.id}</td>
                                            <td className="border border-gray-400 px-4 py-2">{booking.seat}</td>
                                            <td className="border border-gray-400 px-4 py-2">{new Date(booking.booking_date).toLocaleString()}</td>
                                            <td className="border border-gray-400 px-4 py-2">{booking.payment_method}</td>
                                            <td className="border border-gray-400 px-4 py-2">{booking.passengerId}</td>
                                            <td className="border border-gray-400 px-4 py-2">{booking.ticketId}</td>
                                            <td className="border border-gray-400 px-4 py-2">
                                                <button 
                                                    onClick={() => deleteBooking(booking.id)} 
                                                    className="py-1 px-2 rounded-md bg-red-600 text-white duration-200 hover:scale-95"
                                                >
                                                    Delete
                                                </button>
                                            </td>
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
            </DashboardLayout>
        </div>
    )
}

export default BookingPage;
