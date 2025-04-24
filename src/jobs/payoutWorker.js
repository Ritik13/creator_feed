const { Worker } = require("bullmq");
const redis = require("../config/redis");
const Payout = require("../modules/payout/payout.model");
const Creator = require("../modules/creator/model/creator.model");

const create_payout_worker = new Worker('payout-queue', async job => {
    try {
        const { creator_id, amount, method, reference_id, status } = job.data
        const tns = await Payout.create({ creator_id, amount, method, reference_id, status });
        Creator.decrement('total_earned', { by: amount, where: { id: creator_id } });
        Creator.increment('total_paid_out', { by: amount, where: { id: creator_id } });
        console.log(`Processed payout for ${creator_id}, amount: ${amount}`);
    } catch (err) {
        throw err
    }
}, { connection: redis });

module.exports = create_payout_worker


create_payout_worker.on('failed', async (job, err) => {
    console.error(` Payout job failed after retries: ${job.id}`, err.message);

    try {
        await Payout.update({ status: 'failed' }, { where: { reference_id: job.data.reference_id } });
    } catch (updateErr) {
        console.error('Could not update payout status to failed:', updateErr.message);
    }
});
