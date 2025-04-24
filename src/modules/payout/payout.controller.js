const Creator = require("../creator/model/creator.model");
const Payout = require("./payout.model");
const payoutQ = require("./payoutQueue");


const createPayout = async (req, res) => {
    const { creator_id, amount, method, reference_id } = req.body;
    if (!creator_id) {
        return res.status(400).send({ "error": "Creator id is required" });
    }
    try {
        const creator = await Creator.findOne({ where: { id: creator_id }});
        if (parseFloat(creator.total_earned) < parseFloat(amount)) {
            return res.status(400).send({ "message": "Not enough balance" })
        }
        await payoutQ.add('payout-job' , {creator_id, amount, method, reference_id,  status: 'pending' } , {attempts: 2})
        res.status(200).send({ "message": "Transaction created" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const getAllPayout = async (req, res) => {
    const creator_id = req.params.id;
    if (!creator_id) {
       return  res.status(400).send({ "error": "Creator id is required" });
    }
    try {
        const tns = await Payout.findAll({where : {creator_id} , order: [['createdAt', 'DESC']]});
        res.status(200).send({ "message": "Transaction fetche", data: tns })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


module.exports = { createPayout , getAllPayout }
