const express = require('express');
const {createPayout, getAllPayout} = require('./payout.controller');
const payoutRouter = express.Router();
payoutRouter.post('/payout', createPayout);
payoutRouter.get('/payout/:id' , getAllPayout);


module.exports = payoutRouter
