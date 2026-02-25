import express from 'express';
import {addUser, getAllRegisteredUser, LoginUser} from '../controller/Register.js';

const userRouter=express.Router();
userRouter.get('/',getAllRegisteredUser)
userRouter.post('/register',addUser);
userRouter.post('/login',LoginUser);


export default userRouter;