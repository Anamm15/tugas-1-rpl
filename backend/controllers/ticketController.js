import { Aircraft, Airline, Flight, Ticket } from "../models/model.js";

export const getAllTickets = async(req, res) => {
    try {
        const tickets = await Ticket.findAll({
            include: [{
                model: Flight,
                as: 'flight',
                attributes: ['flight_code', 'arrival_airport', 'destination', 'departure_time', 'arrival_time'],
                include: [{
                    model: Aircraft,
                    as: 'aircraft',
                    attributes: ['model', 'capacity'],
                    include: [{
                        model: Airline,
                        as: 'airline',
                        attributes: ['name']
                    }]
                }]
            }],
            order: [['id', 'DESC']]
        });
        if (!tickets) return res.status(404).json({ message: "No tickets found" });
        return res.status(200).json(tickets)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getAvailableTickets = async(req, res) => {
    try {
        const tickets = await Ticket.findAll({
            attributes: ['id', 'price', 'class', 'stock', 'sold', 'baggage'],
            include: [{
                model: Flight,
                as: 'flight',
                attributes: ['flight_code', 'arrival_airport', 'destination', 'departure_time', 'arrival_time'],
                include: [{
                    model: Aircraft,
                    as: 'aircraft',
                    attributes: ['model', 'capacity'],
                    include: [{
                        model: Airline,
                        as: 'airline',
                        attributes: ['name']
                    }]
                }]
            }],
            order: [['id', 'DESC']]
        });
        if (!tickets) return res.status(404).json({ message: "No tickets found" });
        return res.status(200).json(tickets)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getTicketById = async(req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findByPk(id, {
            attributes: ['id', 'price', 'class', 'stock', 'sold', 'baggage', 'flightId']
        });
        if (!ticket) return res.status(404).json({ message: "Ticket not found" });
        return res.status(200).json(ticket)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const addTicket = async (req, res) => {
    try {
        const { price, ticketClass, stock, baggage, flightId } = req.body;
        await Ticket.create({ price, class: ticketClass, stock, baggage, flightId }); 
        return res.status(201).json({ message: "Ticket added successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateTicket = async(req, res) => {
    try {
        const { id, price, ticketClass, stock, baggage, flightId } = req.body;
        await Ticket.update({ price, class: ticketClass, stock, baggage, flightId }, { where: { id } });
        return res.status(200).json({ message: "Ticket updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteTicket = async(req, res) => {
    try {
        const { id } = req.params;
        await Ticket.destroy({ where: { id } });
        return res.status(200).json({ message: "Ticket deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}