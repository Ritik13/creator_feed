const Creator = require("../model/creator.model");


const createCreator = async (req, res) => {
    const { name, email, payout_account_id, total_earned, total_paid_out } = req.body;
    if (!email) {
        res.status(400).send({ "error": "Email id is required" });
    }
    try {
        const creator = await Creator.create({ name, email, payout_account_id, total_earned, total_paid_out });
        res.status(200).send({ "message": "Creator created", data: creator })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
const getAllCreators = async (req, res) => {
    try {
        const creators = await Creator.findAndCountAll();
        res.status(200).json({ message: "Creators Found", data: creators });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getCreatorById = async (req, res) => {
    const { id } = req.params;
    try {
        const creator = await Creator.findOne({ where: { id } });
        if (!creator) {
            return res.status(404).json({ message: "Creator not found" });
        }
        res.status(200).json({ message: "Creator Found", data: creator });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const updateCreatorById = async (req, res) => {
    const id = req.params.id;
    const { name, email, payout_account_id, total_earned, total_paid_out } = req.body;
    try {
        const [updated] = await Creator.update({ name, email, payout_account_id, total_earned, total_paid_out }, { where: { id } });
        if (updated === 0) {
            return res.status(404).json({ message: "Creator not found" });
        }

        const updatedCreator = await Creator.findOne({ where: { id } });
        res.status(200).json({ message: "Creator updated", data: updatedCreator });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
const deleteCreatorById = async (req, res) => {
    const { id } = req.params;
    try {
        const creator = await Creator.destroy({ where: { id } });
        if (!creator) {
            return res.status(404).json({ message: "Creator not found" });
        }
        res.status(200).json({ message: "Creator Found", data: creator });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { createCreator, getAllCreators, getCreatorById, updateCreatorById, deleteCreatorById }
