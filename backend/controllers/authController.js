import { Account } from "../models/model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Account.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );
    
        res.json({ token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const register = async(req, res) => {
    try {
        const { name, email, phoneNumber, address, gender, age, password } = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 10);
        await Account.create({ name, email, phone_number: phoneNumber, address, gender, age, password: hashedPassword, role: "Passenger" }); 

        return res.status(201).json({ message: "User added successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const logout = async (req, res) => {
    try {
      return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  