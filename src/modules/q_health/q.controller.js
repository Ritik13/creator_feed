const payoutQ = require("../payout/payoutQueue")

const qhealthGetController = async (req, res) => {
    try {
        const waiting = await payoutQ.getWaitingCount();
        const acitve = await payoutQ.getActiveCount();
        const completed = await payoutQ.getCompletedCount();
        const failed = await payoutQ.getFailedCount();
        const delayed = await payoutQ.getDelayedCount();

        res.status(200).send({ "message": "success", "data": { waiting, acitve, completed, failed, delayed } });
    } catch (err) {
        res.status(500).send({ error: err });
    }
}

module.exports = qhealthGetController;
