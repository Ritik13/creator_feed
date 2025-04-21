import {User}  from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


export const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword, role });
        res.status(200).send({ "message": "user created" })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
}

export const getUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Wrong password' });

        const token = jwt.sign(
            {id: user.id , email : user.password , role: user.role},
            process.env.JWT_SECRET,
            {expiresIn : '1h'}
        );

        res.status(200).send({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
