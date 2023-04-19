import express from 'express';
import mongoose from "mongoose";
import {registerValidation, loginValidation} from "./validations.js";
import {handleValidationErrors, checkAuth} from './utils/index.js'
import * as UserController from "./controllers/UserController.js";
import cors from 'cors'
import dotenv from 'dotenv'


mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB error', err));

const app = express();

dotenv.config()
app.use(express.json());
app.use(cors());

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.patch('/profile/wallet', handleValidationErrors, UserController.setWallet);
app.patch('/profile/transactions', handleValidationErrors, UserController.setTransactionHistory);
app.patch('/profile/convert', handleValidationErrors, UserController.setConvertHistory);
app.patch('/profile/api', handleValidationErrors, UserController.setApiKeys);
app.patch('/profile/settings', handleValidationErrors, UserController.setPersonal);
app.patch('/profile/verification', handleValidationErrors, UserController.setVerified);
app.get('/auth/me', checkAuth, UserController.getMe);


app.listen(process.env.PORT || 3001, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK')
})