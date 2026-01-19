import express, {type Request, type Response} from 'express';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import { verifyToken } from '../middleware/auth.js';

const authRoute = express.Router();

authRoute.post('/login', [
    check('email', 'valid email required').isEmail(),
    check('password', 'password must be at least 6 characters').isLength({min: 6})
] , async(req: Request, res: Response) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message: errors.array()});
    }

    const { email, password } = req.body; 
    try {
        const loggedUser  = await User.findOne({ email });

        if(!loggedUser){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const match = await bcrypt.compare(password, loggedUser.password);
        if(!match){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = jwt.sign({userId: loggedUser.id}, process.env.JWT_SECRET as string, {expiresIn: '1d'});
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24        
        })

        return res.status(200).json({userId: loggedUser._id});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Something went wrong"});   
    }
    
});

authRoute.get('/validate-token', verifyToken, (req: Request, res: Response) => {
    res.status(200).json({userId: req.userId});
})

authRoute.post('/logout', (req: Request, res: Response) => {
    res.cookie('auth_token', "", {
        expires: new Date(0)
    })
    return res.status(200).json({message: "Log out successful!"});
})

export default authRoute;