import User from '../models/user.js';
import express, { type Request, type Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';

const userRoute = express.Router();

userRoute.post('/register', [
    check('firstName', 'first name is required').isString(),
    check('lastName', 'last name is required').isString(),
    check('email', 'email is required').isEmail(),
    check('password', 'password must be at least 6 characters').isLength({min: 6})
], async(req: Request, res: Response) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message: errors.array()});
    }
    try {
        let user = await User.findOne({
            email: req.body.email
        });

        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        req.body.password = hashedPassword;

        if(user){
            return res.status(400).json({message: "User already exists"});
        }
        user = new User(req.body);
        await user.save();
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET as string, {expiresIn: '1d'});
        res.cookie('auth_token', token, {
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24
        });

        return res.status(201).json({message: "User successfully created!"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Something went wrong"});
    }
});

export default userRoute;
