const Creator = require("../creator/model/creator.model");
const Transaction = require("./transaction.model");


const createTransaction = async (req, res) => {
    const { creator_id , amount, source } = req.body;
    if (!creator_id) {
       return  res.status(400).send({ "error": "Creator id is required" });
    }
    try {

        const tns = await Transaction.create({creator_id , amount, source  });
        Creator.increment('total_earned', { by: amount, where: { id: creator_id } });
        res.status(200).send({ "message": "Transaction created", data: tns })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
const getAllTransactionsForCreator = async (req, res) => {
    const creator_id = req.params.id;
    if (!creator_id) {
       return  res.status(400).send({ "error": "Creator id is required" });
    }
    try {
        const tns = await Transaction.findAll({where : {creator_id} , order: [['createdAt', 'DESC']]});
        res.status(200).send({ "message": "Transaction fetche", data: tns })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = {createTransaction, getAllTransactionsForCreator}
