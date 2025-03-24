import db from "../config/database.js";
import { Aircraft, Airline, Booking, Flight, Passenger, Ticket } from "../models/model.js"

export const getAllBookings = async (req, res) => {
    try {
        let { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows: bookings } = await Booking.findAndCountAll({
            order: [['id', 'DESC']],
            limit,
            offset
        });

        return res.status(200).json({
            bookings,
            currentPage: page,
            totalItems: count,
            totalPages: Math.ceil(count / limit),
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getBookingById = async(req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findByPk(id);
        if (!booking) return res.status(404).json({ message: "Booking not found" });
        return res.status(200).json(booking)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getBookingsPassenger = async(req, res) => {
    try {
        const { accountId } = req.params;
        let { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const offset = (page - 1) * limit;

        const passenger = await Passenger.findOne({ where: { accountId } });

        if (!passenger) return res.status(404).json({ message: "Passenger not found" });

        const { count, rows: bookings_history } = await Booking.findAndCountAll({
            attributes: ['id', 'seat', 'booking_date', 'payment_method'],
            include: [{
               model: Ticket,
               as: 'ticket',
               attributes: ['price', 'class', 'baggage'],
                include: [{
                    model: Flight,
                    as: 'flight',
                    attributes: ['arrival_airport', 'destination'],
                    include: [{
                        model: Aircraft,
                        as: 'aircraft',
                        attributes: ['id'],
                        include: [{
                            model: Airline,
                            as: 'airline',
                            attributes: ['name']
                        }]
                    }]
               }] 
            }],
            offset,
            limit,
            order: [['id', 'DESC']]
        });

        return res.status(200).json({
            bookings_history,
            currentPage: page,
            totalItems: count,
            totalPages: Math.ceil(count / limit),
        });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const bookTicket = async (req, res) => {
    const { ticketId, accountId, identity, passport, origin, paymentMethod } = req.body;
    const t = await db.transaction();

    try {
        let passenger = await Passenger.findOne({
            where: { accountId },
            transaction: t
        });

        if (!passenger) {
            passenger = await Passenger.create({
                accountId,
                identity,
                passport,
                origin
            }, { transaction: t });
        }

        const ticket = await Ticket.findOne({
            where: { id: ticketId },
            lock: t.LOCK.UPDATE, 
            transaction: t
        });

        if (!ticket) {
            await t.rollback();
            return res.status(404).json({ message: "Ticket not found" });
        }

        if (ticket.stock <= 0) {
            await t.rollback();
            return res.status(400).json({ message: "Ticket is out of stock" });
        }

        ticket.stock -= 1;
        ticket.sold += 1;
        await ticket.save({ transaction: t });

        const booking = await Booking.create({
            passengerId: passenger.id,
            ticketId,
            payment_method: paymentMethod,
            seat: 'A1',
            booking_date: new Date() 
        }, { transaction: t });

        await t.commit();
        return res.status(201).json({ message: "Booking successful", booking });

    } catch (error) {
        await t.rollback();
        return res.status(500).json({ message: "Transaction failed", error: error.message });
    }
};

export const updateBooking = async(req, res) => {
    try {
        const { seat, id } = req.body;
        await Booking.update({ seat }, { where: { id } });
        return res.status(200).json({ message: "Booking updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteBooking = async(req, res) => {
    try {
        const { id } = req.params;
        await Booking.destroy({ where: { id } });
        return res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}