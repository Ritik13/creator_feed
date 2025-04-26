const Creator = require("../creator/model/creator.model");
const Payout = require("../payout/payout.model");
const Transaction = require("../transaction/transaction.model");


const { Op } = require("sequelize");

 const getAdminSummary = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const total_earned = await Creator.sum('total_earned');
    const total_paid_out = await Creator.sum('total_paid_out');
    const total_creators = await Creator.count();
    const total_payouts = await Payout.count();

    const today_earned = await Transaction.sum('amount', {
      where: {
        createdAt: {
          [Op.between]: [startOfDay, endOfDay]
        }
      }
    });

    const today_paid_out = await Payout.sum('amount', {
      where: {
        createdAt: {
          [Op.between]: [startOfDay, endOfDay]
        }
      }
    });

    return res.status(200).json({
      total_earned,
      total_paid_out,
      total_creators,
      total_payouts,
      today_earned,
      today_paid_out
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

 const getTopCreators = async (req, res) => {
  try {
    const creators = await Creator.findAll({
      order: [['total_earned', 'DESC']],
      limit: 5
    });

    res.status(200).json({ top_creators: creators });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

 const getFailedPayouts = async (req, res) => {
  try {
    const payouts = await Payout.findAll({
      where: { status: 'failed' },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({ failed_payouts: payouts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

 const getPendingPayouts = async (req, res) => {
  try {
    const payouts = await Payout.findAll({
      where: { status: 'pending' },
      order: [['createdAt', 'ASC']]
    });

    res.status(200).json({ pending_payouts: payouts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {getAdminSummary , getFailedPayouts , getPendingPayouts , getTopCreators}
