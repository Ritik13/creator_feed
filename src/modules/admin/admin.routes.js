const express = require('express');
const adminRouter = express.Router();
const {getAdminSummary , getFailedPayouts , getPendingPayouts , getTopCreators} = require('./admin.controller')

adminRouter.get('/admin/summary', getAdminSummary);
adminRouter.get('/top-creators', getTopCreators);
adminRouter.get('/payouts/failed', getFailedPayouts);
adminRouter.get('/payouts/pending', getPendingPayouts);

module.exports = adminRouter
