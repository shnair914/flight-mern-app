import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from '../api-client';
import { BsMap } from "react-icons/bs";
import { CgAirplane } from "react-icons/cg";

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
                <Link to="/add-flight" className="bg-blue-500 p-4 text-white text-xl font-bold hover:bg-blue-400 
                cursor-pointer">Add Flight</Link>
            </span>
            <div className="grid grid-cols-1 gap-8">
                {flightData?.map((flight) => (
                    <div className="flex flex-col justify-between border border-slate-200 rounded-lg
                    p-6 gap-8">
                        <h2 className="text-2xl font-bold ">{flight.companyName}</h2>
                        <div className="text-lg whitespace pre-line text-slate-500">{flight.description}</div>
                        <div className="white-space pre-line grid grid-cols-4 gap-2">
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-1">
                                <BsMap/>
                                <span>{`${flight.arrivalCity},`}</span> 
                                <span>{flight.arrivalCountry}</span>
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-1">
                                <BsMap/>
                                <span>{`${flight.departureCity},`}</span> 
                                <span>{flight.departureCountry}</span>
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-1">
                                <span>{`$${flight.flightPrice}`}</span> 
                            </div>
                             <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-1">
                                <CgAirplane/>
                                <span>{`${flight.tickType}`}</span> 
                            </div>
                        </div>
                        <Link to={`/edit-flight/${flight._id}`} className="p-4 bg-blue-500 text-white font-semibold rounded-sm
                        w-34 flex items-center justify-center hover:bg-blue-400 cursor-pointer">View Details</Link>
                    </div>
                ))}
            </div>
            
        </div>
    )
};

export default MyFlights;