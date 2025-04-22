import express from 'express'
import { authMiddleWare, checkRoleMDL } from '../middlewares/authMiddleware.js';
import { getFeedAnalytics } from '../controllers/analyticController.js';
const adminRouter = express.Router();


adminRouter.get('/admin/analytics', authMiddleWare, checkRoleMDL('admin') , getFeedAnalytics);


export default adminRouter
