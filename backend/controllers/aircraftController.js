import { Aircraft } from "../models/model.js";

export const getAircrafts = async(req, res) => {
    try {
        const aircrafts = await Aircraft.findAll();
        if (!aircrafts) return res.status(404).json({ message: "No aircrafts found" });
        return res.status(200).json(aircrafts)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getAircraftByAirline = async(req, res) => {
    try {
        const aircrafts = await Aircraft.findAll({ where: { airlineId: req.params.id } });
        if (!aircrafts) return res.status(404).json({ message: "No aircrafts found" });
        return res.status(200).json(aircrafts)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const addAircraft = async (req, res) => {
    try {
        const { model, capacity } = req.body;
        await Aircraft.create({ model, capacity }); 
        return res.status(201).json({ message: "Aircraft added successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateAircraft = async(req, res) => {
    try {
        const { id, model, capacity } = req.body;
        await Aircraft.update({ model, capacity }, {where: { id }}); 
        return res.status(201).json({ message: "Aircraft added successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteAircraft = async(req, res) => {
    try {
        const { id } = req.params;
        await Aircraft.destroy({ where: { id } });
        return res.status(200).json({ message: "Aircraft deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}