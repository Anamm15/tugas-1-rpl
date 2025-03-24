import { Passenger } from "../models/model.js";

export const checkPassenger = async(req, res) => {
    try {
        const { accountId } = req.params;
        const passenger = await Passenger.findOne({ where: { accountId } });
        if (!passenger) return res.status(404).json({ message: "Passenger not found" });
        return res.status(200).json(passenger);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const addPassenger = async(req, res) => {
    try {
        const { accountId, identity, passport, origin } = req.body;
        await Passenger.create({ accountId, identity, passport, origin });
        return res.status(201).json({ message: "Passenger added successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}