import DashboardLayout from "../layouts/dashboard";
import { useEffect, useState } from "react";
import axios from 'axios';
import Modal from "../components/modal";

const FlightPage = () => {
    const [flights, setFlights] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [flightCode, setFlightCode] = useState('');
    const [arrivalAirport, setArrivalAirport] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [destination, setDestination] = useState('');
    const [aircraftId, setAircraftId] = useState('');
    const [actualDepartureTime, setActualDepartureTime] = useState('');
    const [statusDeparture, setStatusDeparture] = useState('On-Time');
    const [actualArrivalTime, setActualArrivalTime] = useState('');
    const [statusArrival, setStatusArrival] = useState('On-Time');
    const [addMessage, setAddMessage] = useState('');
    const [selectedFlight, setSelectedFlight] = useState(null);
    const limit = 10;


    useEffect(() => {
        const fetchAvailableTickets = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/flight/getFlights?page=${currentPage}&limit=${limit}`);
                if (response.status === 200) {
                    setFlights(response.data.flights);
                    setTotalPages(response.data.totalPages);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAvailableTickets();
    }, [currentPage]);

    const handleAddOpenModal = async() => {
        setIsAddModalOpen(true);
    }

    const handleAddCloseModal = () => {
        setIsAddModalOpen(false);
    }

    const handleUpdateOpenModal = async(id) => {
        try {
            const response = await axios.get(`http://localhost:5000/flight/getFlightById/${id}`);
            if (response.status === 200) {
                setFlightCode(response.data.flight_code);
                setArrivalAirport(response.data.arrival_airport);
                setDepartureTime(response.data.departure_time);
                setArrivalTime(response.data.arrival_time);
                setDestination(response.data.destination);
                setAircraftId(response.data.aircraft.id);

                if (response.data.departure) {
                    setActualDepartureTime(response.data.departure.time);
                    setStatusDeparture(response.data.departure.status);
                }

                if(response.data.arrival) {
                    setActualArrivalTime(response.data.arrival.time);
                    setStatusArrival(response.data.arrival.status);
                }
            }
            setSelectedFlight(id);
            setIsUpdateModalOpen(true);
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    const handleUpdateCloseModal = () => {
        setIsUpdateModalOpen(false);
    }

    const deleteFlight = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/flight/delete/${id}`);
            if (response.status === 200) {
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddFlight = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/flight/add', {
                flight_code: flightCode,
                arrival_airport: arrivalAirport,
                departure_time: departureTime,
                arrival_time: arrivalTime,
                destination,
                aircraftId
            });
            if (response.status === 201) {
                window.location.reload();
            }
        } catch (error) {
            setAddMessage(error.response.data.message);
        }
    }

    const handleUpdateFlight = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:5000/flight/update', {
                id: selectedFlight,
                flight_code: flightCode,
                arrival_airport: arrivalAirport,
                departure_time: departureTime,
                arrival_time: arrivalTime,
                destination,
                aircraftId,
                actual_departure_time: actualDepartureTime,
                status_departure: statusDeparture,
                actual_arrival_time: actualArrivalTime,
                status_arrival: statusArrival
            });
            if (response.status === 200) {
                window.location.reload();
            }
        } catch (error) {
            setAddMessage(error.response.data.message);
        }
    }

    return (
        <div>
            <DashboardLayout>
                <h1 className="font-semibold text-4xl mb-8">Flight List</h1>
                {
                    flights.length > 0 && (
                        <div className="overflow-x-auto">
                            <table className="text-center border border-gray-400">
                                <thead className="bg-gray-200 border-b border-gray-400">
                                    <tr>
                                        <th className="border border-gray-800 px-4 py-2">Flight Code</th>
                                        <th className="border border-gray-800 px-4 py-2">Arrival Airport</th>
                                        <th className="border border-gray-800 px-4 py-2">Destination</th>
                                        <th className="border border-gray-800 px-4 py-2">Departure Time</th>
                                        <th className="border border-gray-800 px-4 py-2">Arrival Time</th>
                                        <th className="border border-gray-800 px-4 py-2">Airline</th>
                                        <th className="border border-gray-800 px-4 py-2">Aircraft</th>
                                        <th className="border border-gray-800 px-4 py-2">Capacity</th>
                                        <th className="border border-gray-800 px-4 py-2">Actual Departure</th>
                                        <th className="border border-gray-800 px-4 py-2">Status Departure</th>
                                        <th className="border border-gray-800 px-4 py-2">Actual Arrival</th>
                                        <th className="border border-gray-800 px-4 py-2">Status Arrival</th>
                                        <th className="border border-gray-800 px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {flights.map((flight, index) => (
                                        <tr 
                                            key={flight.id} 
                                            className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                                        >
                                            <td className="border border-gray-400 px-4 py-2">{flight.flight_code}</td>
                                            <td className="border border-gray-400 px-4 py-2">{flight.arrival_airport}</td>
                                            <td className="border border-gray-400 px-4 py-2">{flight.destination}</td>
                                            <td className="border border-gray-400 px-4 py-2">{new Date(flight.departure_time).toLocaleString()}</td>
                                            <td className="border border-gray-400 px-4 py-2">{new Date(flight.arrival_time).toLocaleString()}</td>
                                            <td className="border border-gray-400 px-4 py-2">{flight.aircraft.airline.name}</td>
                                            <td className="border border-gray-400 px-4 py-2">{flight.aircraft.model}</td>
                                            <td className="border border-gray-400 px-4 py-2">{flight.aircraft.capacity}</td>
                                            <td className="border border-gray-400 px-4 py-2">{flight.arrival ? new Date(flight.arrival.time).toLocaleString() : '-'}</td>
                                            <td className="border border-gray-400 px-4 py-2">{flight.departure?.status ?? '-'}</td>
                                            <td className="border border-gray-400 px-4 py-2">{flight.departure ? new Date(flight.departure.time).toLocaleString() : '-'}</td>
                                            <td className="border border-gray-400 px-4 py-2">{flight.arrival?.status ?? '-'}</td>
                                            <td className="border border-gray-400 px-4 py-2 flex gap-2 justify-center">
                                                <button 
                                                    onClick={() => handleUpdateOpenModal(flight.id)} 
                                                    className="py-1 px-2 rounded-md bg-blue-600 text-white duration-200 hover:scale-95"
                                                >
                                                    Update
                                                </button>
                                                <button 
                                                    onClick={() => deleteFlight(flight.id)} 
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
                <button 
                    className="fixed bottom-5 right-8 py-2 px-8 bg-blue-500 hover:bg-blue-700 duration-200 text-white rounded-lg"
                    onClick={handleAddOpenModal}
                >
                    Add Flight
                </button>
            </DashboardLayout>

            <Modal isOpen={isAddModalOpen} onClose={handleAddCloseModal} title="Add Flight">
                <form onSubmit={handleAddFlight}>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Flight Code</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter Flight Code"
                            value={flightCode}
                            onChange={(e) => setFlightCode(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Destination</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter Destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Arrival Airport</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter Arrival Airport"
                            value={arrivalAirport}
                            onChange={(e) => setArrivalAirport(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Departure Time</label>
                        <input
                            type="datetime-local"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={departureTime}
                            onChange={(e) => setDepartureTime(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Arrival Time</label>
                        <input
                            type="datetime-local"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={arrivalTime}
                            onChange={(e) => setArrivalTime(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Aircraft Id</label>
                        <input
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter Aircraft Id"
                            value={aircraftId}
                            onChange={(e) => setAircraftId(e.target.value)}
                        />
                    </div>
                    <button
                        className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded transition duration-200"
                        type="submit"
                    >
                        Add
                    </button>
                    <p className="text-red-500 mt-2 text-sm"> {addMessage} </p>
                </form>
            </Modal>

            <Modal isOpen={isUpdateModalOpen} onClose={handleUpdateCloseModal} title="Update Flight">
                <form onSubmit={handleUpdateFlight}>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Flight Code</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter Flight Code"
                            value={flightCode}
                            onChange={(e) => setFlightCode(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Destination</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter Destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Arrival Airport</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter Arrival Airport"
                            value={arrivalAirport}
                            onChange={(e) => setArrivalAirport(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Departure Time</label>
                        <input
                            type="datetime-local"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={departureTime}
                            onChange={(e) => setDepartureTime(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Arrival Time</label>
                        <input
                            type="datetime-local"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={arrivalTime}
                            onChange={(e) => setArrivalTime(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Aircraft Id</label>
                        <input
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter Aircraft Id"
                            value={aircraftId}
                            onChange={(e) => setAircraftId(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Actual Departure</label>
                        <input
                            type="datetime-local"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={actualDepartureTime}
                            onChange={(e) => setActualDepartureTime(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Status Departure</label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={statusDeparture}
                            onChange={(e) => setStatusDeparture(e.target.value)}
                        >
                            <option value="On-Time">On-Time</option>
                            <option value="Delayed">Delayed</option>
                            <option value="Departed">Departed</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Actual Arrival</label>
                        <input
                            type="datetime-local"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={actualArrivalTime}
                            onChange={(e) => setActualArrivalTime(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Status Arrival</label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={statusArrival}
                            onChange={(e) => setStatusArrival(e.target.value)}
                        >
                            <option value="On-Time">On-Time</option>
                            <option value="Delayed">Delayed</option>
                            <option value="Arrived">Arrived</option>
                        </select>
                    </div>
                    <button
                        className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded transition duration-200"
                        type="submit"
                    >
                        Add
                    </button>
                    <p className="text-red-500 mt-2 text-sm"> {addMessage} </p>
                </form>
            </Modal>
        </div>
    )
}

export default FlightPage;