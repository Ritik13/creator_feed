const { Queue } = require("bullmq");
const redis = require("../../config/redis");

const payoutQ = new Queue('payout-queue' , {
    connection : redis
})

module.exports = payoutQ
