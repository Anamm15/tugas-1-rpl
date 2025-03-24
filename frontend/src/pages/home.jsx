import { useState, useEffect } from "react";
import Card from "../components/card";
import Modal from "../components/modal";
import Navbar from "../components/navbar";
import axios from "axios";
import { getUserIdFromToken } from "../utils/getUserId";


const Homepage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [availableTickets, setAvailableTickets] = useState([]);
    const [checkPassengerMessage, setCheckPassengerMessage] = useState('');
    const [identity, setIdentity] = useState('');
    const [passport, setPassport] = useState('');
    const [origin, setOrigin] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Cash');
    const [selectedTicket, setSelectedTicket] = useState(null);

    useEffect(() => {
        const fetchAvailableTickets = async () => {
            try {
                const response = await axios.get('http://localhost:5000/ticket/getAvailableTickets');
                if (response.status === 200) {
                    setAvailableTickets(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAvailableTickets();
    }, []);

    const handleOpenModal = async(id) => {
        try {
            const userId = getUserIdFromToken();
            const response = await axios.get(`http://localhost:5000/pasenger/check/${userId}`);
            if (response.status === 200) {
                setCheckPassengerMessage('Data berikut telah anda isi sebelumnya');
                setIdentity(response.data.identity);
                setPassport(response.data.passport);
                setOrigin(response.data.origin);
                setSelectedTicket(id);
            }
        } catch (error) {
            if (error.response.status === 404) {
                setCheckPassengerMessage('Silahkan lengkapi data berikut');
            }
        }
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleBooking = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/booking/add', {
                ticketId: selectedTicket,
                accountId: getUserIdFromToken(),
                identity,
                passport,
                origin,
                paymentMethod
            });
            if (response.status === 201) {
                window.location.reload();
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    return (
        <div>
            <Navbar />
            <main className="container mx-auto mt-32">
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {availableTickets.map((ticket) => (
                        <Card key={ticket.id} ticket={ticket} onClick={() => handleOpenModal(ticket.id)} action="Buy" />
                    ))}
                </div>
            </main>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Pembelian Tiket">
                <p className="text-xl text-center mb-4">{checkPassengerMessage}</p>
                <form onSubmit={handleBooking}>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Identity</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your email"
                            value={identity}
                            onChange={(e) => setIdentity(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Passport</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your email"
                            value={passport}
                            onChange={(e) => setPassport(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Origin</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your email"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Payment Method</label>
                        <select
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your email"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="cash">Cash</option>
                            <option value="transfer">Transfer</option>
                        </select>
                    </div>
                    <button
                        className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded transition duration-200"
                        type="submit"
                    >
                        Buy
                    </button>
                </form>
            </Modal>
        </div>
    )
}

export default Homepage;