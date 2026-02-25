import express from 'express';
import {addUser, getAllRegisteredUser,  LoginUser} from '../controller/Register.js';
import verifyToken from '../middleware/Auth.js';
const userRouter=express.Router();
userRouter.get('/',verifyToken,getAllRegisteredUser)
userRouter.post('/register',addUser);
userRouter.post('/login',LoginUser);

export default userRouter;