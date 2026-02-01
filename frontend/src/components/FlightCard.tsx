import type { FlightType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

type Props = {
    flight: FlightType;
}

const FlightCard = ({flight}: Props) => {
    return (
        <div className="grid gric-cols-1 xl:grid-cols-[300px_350px] gap-6 border-2 border-slate-200 p-8 rounded-lg ">
            <div className="w-full h-full">
                <img src={flight.imageUrls[0]} 
                className="h-full w-full object-contain" alt="" />
            </div>
            <div className="flex flex-col justify-between">
                <div className="flex items-center text-sm font-semibold">
                    <div className="flex mr-3">
                        {Array.from({length: flight.starRating}).map(() => (
                            <div >
                                <AiFillStar  className="text-amber-300"/>
                            </div>
                            ) 
                        )}
                    </div>
                  
                    {flight.tickType}
                </div>
                 <span className="text-2xl font-bold">{flight.companyName}</span>
                 <span className="mt-5 line-clamp-4">{flight.description}</span>
                 <div className="flex justify-end items-center mt-5 gap-2">
                    <div className="flex flex-col">
                        <span className="flex justify-end mx-auto font-semibold"> {`$${flight.flightPrice}.00`}</span>
                        <Link to={`/detail/${flight._id}`} className="mt-2 px-2 py-3 font-semibold text-white bg-blue-500 hover:bg-blue-400 
                            rounded-sm cursor-pointer">
                            View More
                        </Link>
                    </div>
                    
                 </div>
            </div>
           
        </div>
    )
}

export default FlightCard;

