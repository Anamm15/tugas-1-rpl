import { Departure } from "../models/model.js";

export const getDepartures = async(req, res) => {
    try {
        const departures = await Departure.findAll();
        if (!departures) return res.status(404).json({ message: "No departures found" });
        return res.status(200).json(departures)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getDeparturesByFlight = async(req, res) => {
    try {
        const { flightId } = req.params;
        const departures = await Departure.findOne({ where: { flightId } });
        if (!departures) return res.status(404).json({ message: "No departures found" });
        return res.status(200).json(departures)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const addDeparture = async (req, res) => {
    try {
        const { timeDeparture, status } = req.body;
        await Departure.create({ time: timeDeparture, status }); 
        return res.status(201).json({ message: "Departure added successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateDeparture = async(req, res) => {
    try {
        const { id, timeDeparture, status } = req.body;
        await Departure.update({ time: timeDeparture, status }, { where: { id } });
        return res.status(200).json({ message: "Departure updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteDeparture = async(req, res) => {
    try {
        const { id } = req.params
        await Departure.destroy({ where: { id } });
        return res.status(200).json({ message: "Departure deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}