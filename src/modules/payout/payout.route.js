const express = require('express');
const {createPayout, getAllPayout, retryFailedPayouts, schedulePayout} = require('./payout.controller');
const payoutRouter = express.Router();
payoutRouter.post('/payout', createPayout);
payoutRouter.get('/payout/:id' , getAllPayout);
payoutRouter.post('/payouts/retry' , retryFailedPayouts)
payoutRouter.post('payouts/schedule', schedulePayout)
module.exports = payoutRouter
