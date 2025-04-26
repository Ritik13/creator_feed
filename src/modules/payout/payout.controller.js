const Creator = require("../creator/model/creator.model");
const Payout = require("./payout.model");
const payoutQ = require("./payoutQueue");


const createPayout = async (req, res) => {
  const { creator_id, amount, method, reference_id } = req.body;
  if (!creator_id) {
    return res.status(400).send({ "error": "Creator id is required" });
  }
  try {
    const creator = await Creator.findOne({ where: { id: creator_id } });
    if (parseFloat(creator.total_earned) < parseFloat(amount)) {
      return res.status(400).send({ "message": "Not enough balance" })
    }
    await payoutQ.add('payout-job', { creator_id, amount, method, reference_id, status: 'pending' }, { attempts: 2 })
    res.status(200).send({ "message": "Transaction created" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getAllPayout = async (req, res) => {
  const creator_id = req.params.id;
  if (!creator_id) {
    return res.status(400).send({ "error": "Creator id is required" });
  }
  try {
    const tns = await Payout.findAll({ where: { creator_id }, order: [['createdAt', 'DESC']] });
    res.status(200).send({ "message": "Transaction fetche", data: tns })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const retryFailedPayouts = async (req, res) => {
  try {
    const failedPayouts = await Payout.findAll({
      where: { status: 'failed' }
    });

    for (const payout of failedPayouts) {
      await payoutQ.add('payout-job', {
        creator_id: payout.creator_id,
        amount: payout.amount,
        method: payout.method,
        reference_id: payout.reference_id,
        status: 'pending' // fresh retry
      });
    }

    res.status(200).send({ message: `${failedPayouts.length} failed payouts requeued.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


const schedulePayout = async (req, res) => {
  const { creator_id, amount, method, reference_id, delay_in_seconds } = req.body;
  try {
    await payoutQ.add('payout-job', {
      creator_id,
      amount,
      method,
      reference_id,
      status: 'pending'
    }, {
      delay: delay_in_seconds * 1000
    });

    res.status(200).send({ message: 'Payout scheduled successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = { createPayout, getAllPayout, retryFailedPayouts, schedulePayout }
