const express = require('express');
const qhealthGetController = require('./q.controller');
const qRouter = express.Router();

qRouter.get('/q/health' , qhealthGetController);

module.exports = qRouter
