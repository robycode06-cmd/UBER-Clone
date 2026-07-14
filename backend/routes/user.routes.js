import express from "express";
const userRouter = express.Router();
import { body } from "express-validator";
import userController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

//routes
userRouter.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long')
],userController.registerUser)

userRouter.post('/login',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long')
],userController.loginUser)

userRouter.get('/profile',authMiddleware.authUser,userController.getUserProfile);

userRouter.get('/logout',authMiddleware.authUser,userController.logoutUser);
export default userRouter;