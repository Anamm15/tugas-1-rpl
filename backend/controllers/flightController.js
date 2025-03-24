import { Aircraft, Airline, Arrival, Departure, Flight } from "../models/model.js";
import db from "../config/database.js";

export const getFlights = async(req, res) => {
    try {
        let { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows: flights } = await Flight.findAndCountAll({
            attributes: ['id', 'flight_code', 'arrival_airport', 'destination', 'departure_time', 'arrival_time'],
            include: [{
                model: Aircraft,
                as: 'aircraft',
                attributes: ['model', 'capacity'],
                include: [{
                    model: Airline,
                    as: 'airline',
                    attributes: ['name']
                }]
            }, {
                model: Arrival,
                as: 'arrival',
                attributes: ['time', 'status']
            }, {
                model: Departure,
                as: 'departure',
                attributes: ['time', 'status']
            }],
            order: [['id', 'DESC']],
            offset,
            limit,
        });

        return res.status(200).json({
            flights,
            currentPage: page,
            totalItems: count,
            totalPages: Math.ceil(count / limit),
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getFlightById = async(req, res) => {
    try {
        const { id } = req.params;
        const flight = await Flight.findByPk(id, {
            attributes: ['id', 'flight_code', 'arrival_airport', 'destination', 'departure_time', 'arrival_time'],
            include: [{
                model: Aircraft,
                as: 'aircraft',
                attributes: ['id', 'model', 'capacity'],
                include: [{
                    model: Airline,
                    as: 'airline',
                    attributes: ['name']
                }]
            }, {
                model: Arrival,
                as: 'arrival',
                attributes: ['time', 'status']
            }, {
                model: Departure,
                as: 'departure',
                attributes: ['time', 'status']
            }],
        });

        return res.status(200).json(flight);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const addFlight = async (req, res) => {
    try {
        const { flight_code, arrival_airport, departure_time, arrival_time, destination, aircraftId } = req.body;
        await Flight.create({ flight_code, arrival_airport, departure_time, arrival_time, destination, aircraftId }); 
        return res.status(201).json({ message: "Flight added successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateFlight = async(req, res) => {
    const t = await db.transaction();
    try {
        const { id, flight_code, arrival_airport, departure_time, arrival_time, destination, aircraftId, actual_departure_time, status_departure, actual_arrival_time, status_arrival } = req.body;

        if (actual_departure_time && status_departure) {
            await Departure.create({ time: actual_departure_time, status: status_departure, flightId: id }, { transaction: t });
        }

        if (actual_arrival_time && status_arrival) {
            await Arrival.create({ time: actual_arrival_time, status: status_arrival, flightId: id }, { transaction: t });
        }

        
        await Flight.update({ flight_code, arrival_airport, departure_time, arrival_time, destination, aircraftId }, {where: { id }, transaction: t });
        await t.commit(); 
        console.log(req.body);
        return res.status(200).json({ message: "Flight updated successfully" });
    } catch (error) {
        await t.rollback();
        return res.status(500).json({ message: error.message })
    }
}

export const deleteFlight = async(req, res) => {
    try {
        const { id } = req.params;
        await Flight.destroy({ where: { id } });
        return res.status(200).json({ message: "Flight deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}