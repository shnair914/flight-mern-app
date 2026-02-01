import express, {type Request, type Response} from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import flightRoute from './routes/my-flights.js';
import flightRouter  from './routes/flights.js';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string,
})

mongoose.connect(process.env.MONGO_URI as string)
const app = express();
app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/my-flights', flightRoute);
app.use('/api/flight', flightRouter);

app.get("{*path}", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
})
// Need this for requests that come from protected routes 
console.log(path.join(__dirname, "../../frontend/dist/index.html"))

app.listen(7000, () => {
    console.log("Listening on port 7000");
})


