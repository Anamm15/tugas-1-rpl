import { Arrival } from "../models/model.js";

export const getArrivals = async(req, res) => {
    try {
        const arrivals = await Arrival.findAll();
        if (!arrivals) return res.status(404).json({ message: "No Arrivals found" });
        return res.status(200).json(arrivals)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getArrivalsByFlight = async(req, res) => {
    try {
        const { flightId } = req.params;
        const arrivals = await Arrival.findOne({ where: { flightId } });
        if (!arrivals) return res.status(404).json({ message: "No Arrivals found" });
        return res.status(200).json(arrivals)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const addArrival = async (req, res) => {
    try {
        const { timeArrival, status } = req.body;
        await Arrival.create({ time: timeArrival, status }); 
        return res.status(201).json({ message: "Arrival added successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateArrival = async(req, res) => {
    try {
        const { id, timeArrival, status } = req.body;
        await Arrival.update({ time: timeArrival, status }, { where: { id } });
        return res.status(200).json({ message: "Arrival updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteArrival = async(req, res) => {
    try {
        const { id } = req.params
        await Arrival.destroy({ where: { id } });
        return res.status(200).json({ message: "Arrival deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}