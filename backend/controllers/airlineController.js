import { Airline } from "../models/model.js";

export const getAirlines = async(req, res) => {
    try {
        const airline = await Airline.findAll();
        if (!airline) return res.status(404).json({ message: "No airlines found" });
        return res.status(200).json(airline)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const addAirline = async (req, res) => {
    try {
        const { name, code } = req.body;
        await Airline.create({ name, code }); 
        return res.status(201).json({ message: "Airline added successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateAirline = async(req, res) => {
    try {
        const { id, name, code } = req.body;
        await Airline.update({ name, code }, {where: { id }}); 
        return res.status(201).json({ message: "Airline added successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteAirline = async(req, res) => {
    try {
        const { id } = req.params;
        await Airline.destroy({ where: { id } });
        return res.status(200).json({ message: "Airline deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}