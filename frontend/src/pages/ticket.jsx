import DashboardLayout from "../layouts/dashboard";
import { useEffect, useState } from "react";
import axios from 'axios';
import Modal from "../components/modal";
import Card from "../components/card";

const TicketPage = () => {
    const [availableTickets, setAvailableTickets] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [price, setPrice] = useState(null);
    const [ticketClass, setTicketClass] = useState('Business');
    const [stock, setStock] = useState(null);
    const [baggage, setBaggage] = useState(null);
    const [flightId, setFlightId] = useState(null);
    const [addMessage, setAddMessage] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');
    const [selectedUpdateTicket, setSelectedUpdateTicket] = useState(null);

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

    const handleAddOpenModal = () => {
        setIsAddModalOpen(true);
    }

    const handleAddCloseModal = () => {
        setIsAddModalOpen(false);
    }

    const handleUpdateOpenModal = async(id) => {
        try {   
            const response = await axios.get(`http://localhost:5000/ticket/getTicketById/${id}`);
            if (response.status === 200) {
                setPrice(response.data.price);
                setTicketClass(response.data.class);
                setStock(response.data.stock);
                setBaggage(response.data.baggage);
                setFlightId(response.data.flightId);
            }
            setSelectedUpdateTicket(id);
            setIsUpdateModalOpen(true);
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    const handleUpdateCloseModal = () => {
        setIsUpdateModalOpen(false);
    }

    const handleAddTicket = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/ticket/add', {
                price,
                ticketClass,
                stock,
                flightId
            });
            if (response.status === 201) {
                window.location.reload();
            }
        } catch (error) {
            setAddMessage(error.response.data.message);
        }
    }

    const handleUpdateTicket = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/ticket/update', {
                id: selectedUpdateTicket,
                price,
                ticketClass,
                stock,
                flightId
            });
            if (response.status === 200) {
                window.location.reload();
            }
        } catch (error) {
            setUpdateMessage(error.response.data.message);
        }
    }

    return (
        <div>
            <DashboardLayout>
                <h1 className="font-semibold text-4xl">Ticket List</h1>
                <div className="mt-10 p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {availableTickets.map((ticket) => (
                        <Card key={ticket.id} ticket={ticket} onClick={() => handleUpdateOpenModal(ticket.id)} action="Update" />
                    ))}
                    <button 
                        className="fixed bottom-5 right-8 py-2 px-8 bg-blue-500 hover:bg-blue-700 duration-200 text-white rounded-lg"
                        onClick={handleAddOpenModal}
                    >
                        Add Ticket
                    </button>
                </div>
            </DashboardLayout>

            <Modal isOpen={isAddModalOpen} onClose={handleAddCloseModal} title="Add Ticket">
                <form onSubmit={handleAddTicket}>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Ticket Price</label>
                        <input
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter ticket price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Ticket Class</label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={ticketClass}
                            onChange={(e) => setTicketClass(e.target.value)}
                        >
                            <option value="Business">Business</option>
                            <option value="Economy">Economy</option>
                            <option value="Premium Economy">Premium Economy</option>
                            <option value="First Class">First Class</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Stock</label>
                        <input
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter ticket stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Baggage</label>
                        <input
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter baggage weight"
                            value={baggage}
                            onChange={(e) => setBaggage(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Flight Id</label>
                        <input
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter flight id"
                            value={flightId}
                            onChange={(e) => setFlightId(e.target.value)}
                        />
                    </div>
                    <button
                        className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded transition duration-200"
                        type="submit"
                    >
                        Add
                    </button>
                    <p className="text-red-500 text-sm mt-2"> { addMessage } </p>
                </form>
            </Modal>

            <Modal isOpen={isUpdateModalOpen} onClose={handleUpdateCloseModal} title="Update Ticket">
                <form onSubmit={handleUpdateTicket}>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Ticket Price</label>
                        <input
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter ticket price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Ticket Class</label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={ticketClass}
                            onChange={(e) => setTicketClass(e.target.value)}
                        >
                            <option value="Business">Business</option>
                            <option value="Economy">Economy</option>
                            <option value="Premium Economy">Premium Economy</option>
                            <option value="First Class">First Class</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Stock</label>
                        <input
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter ticket stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Baggage</label>
                        <input
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter baggage weight"
                            value={baggage}
                            onChange={(e) => setBaggage(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Flight Id</label>
                        <input
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter flight id"
                            value={flightId}
                            onChange={(e) => setFlightId(e.target.value)}
                        />
                    </div>
                    <button
                        className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded transition duration-200"
                        type="submit"
                    >
                        Update
                    </button>
                    <p className="text-red-500 text-sm mt-2"> { updateMessage } </p>
                </form>
            </Modal>
        </div>
    )
}

export default TicketPage;