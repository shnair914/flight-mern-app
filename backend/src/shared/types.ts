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
    tickCount: number;
    flightPrice: number;
    imageUrls: string[];
    starRating: number;
    lastUpdated: Date;
}

export type FlightSearchResponse = {
    data: FlightType[];
    pagination: {
        total: number;
        page: number;
        pages: number;
    }
}