import express from 'express'
import { createUser, getUser } from '../controllers/authController.js';
import { authMiddleWare, checkRoleMDL } from '../middlewares/authMiddleware.js';
const userRouter = express.Router();

userRouter.get('/login', getUser);
userRouter.post('/register' , createUser);
userRouter.get('/me' ,  authMiddleWare , (req, res)=> {
    res.json({ user: req.user });
})
userRouter.get('/admin-stats', authMiddleWare, checkRoleMDL('admin'));


export default userRouter
