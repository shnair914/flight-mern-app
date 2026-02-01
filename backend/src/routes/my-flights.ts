import express, {type Request, type Response} from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import Flight from '../models/flight.js';
import { type FlightType } from '../shared/types.js';
import { verifyToken } from '../middleware/auth.js';
import { body } from 'express-validator';

const flightRoute = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})


flightRoute.post('/',
    [
        body("companyName").notEmpty().withMessage("Company name is required"),
        body("departureCity").notEmpty().withMessage("Departure city is required"),
        body("arrivalCity").notEmpty().withMessage("Arrival city is required"),
        body("departureCountry").notEmpty().withMessage("Departure country is required"),
        body("arrivalCountry").notEmpty().withMessage("Arrival country is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("ticketType").notEmpty().isArray().withMessage("Ticket type is required"),
        body("flightPrice").notEmpty().isNumeric().withMessage("Flight price is required"),
    ], 
    verifyToken, 
    upload.array("imageFiles", 6), 
    async (req: Request, res: Response) => {
        try {
            const imageFiles = req.files as Express.Multer.File[];
            const newFlight:FlightType = req.body;

            const imageUrls = await uploadImages(imageFiles);
            newFlight.imageUrls = imageUrls;
            newFlight.lastUpdated = new Date();
            newFlight.userId = req.userId;

            const flight = new Flight(newFlight);
            await flight.save();

            return res.status(201).json({message: "Flight created!"});

        } catch (error) {
            console.log("Error creating flight: ", error);
            res.status(500).json({message: "Something went wrong"});
        }

})

flightRoute.get('/', verifyToken, async(req: Request, res: Response) => {
    try {
        const flights = await Flight.find({ userId: req.userId});
        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({message: "Error fetching flights"});    
    }
})

flightRoute.get('/:id', verifyToken, async(req: Request, res: Response) => {
    const id = req.params.id?.toString();
    try {

        if(!id){
            return res.status(404).json({message: "Invalid Id"});
        }

        const flight = await Flight.findOne({
            _id: id,
            userId: req.userId
        })

        return res.status(200).json(flight);

    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"});
    }

})

flightRoute.put('/:id', verifyToken, upload.array("imageFiles"), async(req: Request, res: Response) => {
    const flightId = req.params.id;
    
    try {
        if(!flightId){
            return res.status(404).json({message: "Invalid Id"});
        }
        const updateFlight: FlightType = req.body;
        updateFlight.lastUpdated = new Date(); 

        const flight = await Flight.findOneAndUpdate(
            {
                _id: flightId,
                userId: req.userId
            },
            updateFlight,
            {new: true}
        );
        if(!flight){
            return res.status(404).json({message: "Flight does not exist!"});
        }

        const files = req.files as Express.Multer.File[];
        const updatedImageUrls = await uploadImages(files);

        flight.imageUrls = [
            ...updatedImageUrls,
            ...(updateFlight.imageUrls || [])
        ];

        await flight.save();

        return res.status(201).json(flight);
        

    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
});

async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString('base64');
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}

export default flightRoute;


/* 
  

*/