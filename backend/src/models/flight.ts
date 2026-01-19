import mongoose from "mongoose";

export type FlightType = {
    _id: string;
    userId: string;
    companyName: string;
    departureCity: string;
    arrivalCity: string;
    departureCountry: string;
    arrivalCountry: string;
    description: string;
    tickType: string[];
    flightPrice: number;
    imageUrls: string[];
    lastUpdated: Date;
}

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