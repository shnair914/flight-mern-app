import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from '../api-client';
import { FaPlaneArrival, FaPlaneDeparture } from 'react-icons/fa6'
import { CgAirplane } from "react-icons/cg";
import { BiStar } from "react-icons/bi";

const MyFlights = () => {

    const { data: flightData, isError, error } = useQuery(
        {
            queryKey: ['flights'],
            queryFn: apiClient.getFlights,
        }
    );

    if (isError){
        return <span className="text-red-500">{error.message}</span>
    }

    return (
        <div className="space-y-5">
            <span className="flex items-center justify-between">
                <h1 className="text-3xl font-bold ">My Flights</h1>
                <Link to="/add-flight" className="bg-blue-500 p-4 text-white font-semibold rounded-sm hover:bg-blue-400 
                cursor-pointer">Add Flight</Link>
            </span>
            <div className="grid grid-cols-1 gap-8">
                {flightData?.map((flight, index) => (
                    <div className="flex flex-col justify-between border border-slate-200 rounded-lg
                    p-6 gap-8" key={index}>
                        <h2 className="text-2xl font-bold ">{flight.companyName}</h2>
                        <div className="text-lg whitespace pre-line text-slate-500">{flight.description}</div>
                        <div className="white-space pre-line grid grid-cols-5 gap-2">
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-1">
                                <FaPlaneArrival/>
                                <span>{`${flight.arrivalCity},`}</span> 
                                <span>{flight.arrivalCountry}</span>
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-1">
                                <FaPlaneDeparture/>
                                <span>{`${flight.departureCity},`}</span> 
                                <span>{flight.departureCountry}</span>
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-1">
                                <span>{`$${flight.flightPrice}.00`}</span> 
                            </div>
                             <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-1">
                                <CgAirplane/>
                                <span>{`${flight.tickType}`}</span> 
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-1">
                                <BiStar/>
                                <span>{`${flight.starRating} Star Rating`}</span> 
                            </div>
                        </div>
                        <span className="flex justify-end">
                            <Link to={`/edit-flight/${flight._id}`} className="p-4 bg-blue-500
                             text-white font-semibold rounded-sm w-34 flex items-center justify-center
                              hover:bg-blue-400 cursor-pointer">View Details</Link>
                        </span>
                        
                    </div>
                ))}
            </div>
            
        </div>
    )
};

export default MyFlights;

/* 



*/