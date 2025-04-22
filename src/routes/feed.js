import express from 'express'
import { authMiddleWare, hasPermission } from '../middlewares/authMiddleware.js';
import {getFeed, createFeed, patchFeed, deleteFeed, restoreFeed, insertBulkPost} from '../controllers/feedController.js'
const feedRouter = express.Router();

feedRouter.get('/feed', authMiddleWare, getFeed);
feedRouter.post('/feed' ,authMiddleWare , hasPermission('create'),  createFeed);
feedRouter.patch('/feed' , authMiddleWare,hasPermission('create') , patchFeed);
feedRouter.delete('/feed/:id' , authMiddleWare, hasPermission('delete') , deleteFeed);
feedRouter.patch('/feed/restore/:id', authMiddleWare, restoreFeed);
feedRouter.post('/feed/seed', authMiddleWare, insertBulkPost);



export default feedRouter
