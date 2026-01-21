import mongoose from "mongoose";
import { type FlightType } from '../shared/types.js';


const flightSchema = new mongoose.Schema<FlightType>({
    userId: { type: String, required:true},
    companyName: { type: String, required: true},
    departureCity: { type: String, required: true},
    arrivalCity: { type: String, required: true},
    departureCountry: { type: String, required: true},
    arrivalCountry: { type: String, required: true},
    description: { type: String, required: true},
    tickType: [{ type: String, required: true}],
    flightPrice: { type: Number, required: true},
    imageUrls: [{ type: String, required: true}],
    lastUpdated: { type: Date, required: true}
})

const Flight =  mongoose.model<FlightType>('flights', flightSchema);

export default Flight;