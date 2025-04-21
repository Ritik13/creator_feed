import express from 'express'
import { authMiddleWare } from '../middlewares/authMiddleware.js';
import {getFeed, createFeed, patchFeed, deleteFeed} from '../controllers/feedController.js'
const feedRouter = express.Router();

feedRouter.get('/feed', authMiddleWare, getFeed);
feedRouter.post('/feed' ,authMiddleWare,  createFeed);
feedRouter.patch('/feed' , authMiddleWare, patchFeed);
feedRouter.delete('/feed' , authMiddleWare, deleteFeed);



export default feedRouter
