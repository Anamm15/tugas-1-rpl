import CurrencyFormatter from './currencyFormatter'

const Card = ({ ticket, onClick, action }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
            <div className="bg-blue-600 text-white p-4">
                <h3 className="text-xl font-bold"> { ticket?.flight?.aircraft?.airline.name } </h3>
                <p className="text-sm"> {ticket.class} </p>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500">Departure</p>
                        <p className="text-lg font-semibold">
                            {(() => {
                                const date = ticket.flight ? new Date(ticket.flight.departure_time) : new Date();
                                const day = date.getDate();
                                const month = date.getMonth() + 1; 
                                const hours = date.getHours().toString().padStart(2, "0"); 
                                const minutes = date.getMinutes().toString().padStart(2, "0");

                                return `${month}-${day} ${hours}.${minutes}`;
                            })()}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-500">Stock</p>
                        <p className="text-md font-semibold">{ticket.stock}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Arrival</p>
                        <p className="text-lg font-semibold">
                            {(() => {
                            const date = ticket.flight ? new Date(ticket?.flight.arrival_time) : new Date();
                            const day = date.getDate();
                            const month = date.getMonth() + 1; 
                            const hours = date.getHours().toString().padStart(2, "0"); 
                            const minutes = date.getMinutes().toString().padStart(2, "0");

                            return `${month}-${day} ${hours}.${minutes}`;
                            })()}
                        </p>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <div>
                        <p className="text-sm text-gray-500">From</p>
                        <p className="text-lg font-semibold">Jakarta (CGK)</p>
                    </div>
                    <div className="text-gray-400 text-xl">→</div>
                    <div>
                        <p className="text-sm text-gray-500">To</p>
                        <p className="text-lg font-semibold">{ ticket?.flight?.destination }</p>
                    </div>
                </div>

                <div className="mt-4 flex justify-between items-center text-gray-700">
                    <p>Baggage: <span className="font-semibold"> {ticket.baggage} Kg</span></p>
                    <p className="flex gap-1">Price: <CurrencyFormatter amount={ticket.price} className="font-semibold" /> </p>
                </div>

                <button 
                    className="mt-4 bg-blue-500 hover:bg-blue-700 duration-200 text-white py-2 w-full rounded"
                    onClick={onClick}
                    >
                        { action }
                </button>
            </div>
        </div>
    );
}

export default Card;