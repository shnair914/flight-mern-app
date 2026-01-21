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