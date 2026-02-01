import express, { type Request, type Response } from 'express'
import Flight from '../models/flight.js';
import type { FlightSearchResponse } from '../shared/types.js';

const flightRouter = express.Router();


flightRouter.get('/search', async(req: Request, res: Response)=> {
    try {
        const pageSize = 5;
        const pageNumber = parseInt(
            req.query.page ? req.query.page.toString() : "1"
        );

        const query = constructuredQuery(req.query);

        let sortedOptions = {};
        switch(req.query.sortOption){
            case "starRating":
                sortedOptions = { starRating: -1};
                break;
            case "flightPriceAsc":
                sortedOptions = { flightPrice: 1};
                break;
            case "flightPriceDesc":
                sortedOptions = { flightPrice: -1};
                break;
            default:
                sortedOptions = {};
                break;
        }

        const skip = (pageNumber - 1) * pageSize;

        const flights = await Flight
        .find(query)
        .sort(sortedOptions)
        .skip(skip)
        .limit(pageSize);

        const total = await Flight.countDocuments(query);

        const response: FlightSearchResponse = {
            data: flights,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize)
            }
        };
        
        return res.status(200).json(response);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({message: "Internal Server Error"});
    }
});

export default flightRouter;

const constructuredQuery = (queryParams: any) => {
    let constructedQuery: any = {};

    if(queryParams.arrival){
        constructedQuery.$or = [
            { arrivalCity: new RegExp(queryParams.arrival, "i")},
            { arrivalCountry: new RegExp(queryParams.arrival, "i")},
        ];
    }

    if(queryParams.departure){
        constructedQuery.$or = [
            { departureCity: new RegExp(queryParams.departure, "i")},
            { departureCountry: new RegExp(queryParams.departure, "i")},
        ];
    }

    if(queryParams.tickType){
        constructedQuery.tickType = {
            $in: Array.isArray(queryParams.tickType)
                ? queryParams.tickType
                : [queryParams.tickType]
        }
    }

    if(queryParams.starRating){
        
        const starsArray = Array.isArray(queryParams.starRating)
            ? queryParams.starRating.map((s: string) => parseInt(s))
            : [parseInt(queryParams.starRating)]

        constructedQuery.starRating = { $in: starsArray};
    }

    if(queryParams.maxPrice){
        constructedQuery.flightPrice = {
            $lte: parseInt(queryParams.maxPrice.toString())
        }
    }

    return constructedQuery;
}

/* 
    const constructQuery = (queryParams: any) => {

        const constructedQuery: any = {};

        if(queryParams.tickType){

        }

    }

*/