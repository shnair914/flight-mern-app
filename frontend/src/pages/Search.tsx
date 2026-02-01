import { useQuery } from "@tanstack/react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from '../api-client';
import { useState } from "react";
import FlightCard from "../components/FlightCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import FlightTicketTypesFilter from "../components/FlightTicketTypesFilter";
import PriceFilter from "../components/PriceFilter";
const Search = () => {
    
    const search = useSearchContext();
    const [page, setPage] = useState<number>(1);
    const [selectedStarRating, setSelectedStarRating] = useState<string[]>([]);
    const [selectedTicketType, setSelectedTicketType] = useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
    const [sortedOption, setSortedOption] = useState<string>("");
 
    const searchParams = {
        arrival: search?.arrival || '',
        departure: search?.departure || '',
        checkIn: search?.checkIn.toISOString() || '',
        checkOut: search?.checkOut.toISOString() || '',
        page: page.toString(),
        starRating: selectedStarRating,
        tickType: selectedTicketType,
        maxPrice: selectedPrice?.toString(),
        sortOption: sortedOption
    }
    
    const {data: flightData } = useQuery({
        queryKey: ["searchFlights", searchParams],
        queryFn: ()=> apiClient.searchFlights(searchParams),
    })

    const handleTicketTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const tickVal = event.target.value;
        const isChecked = event.target.checked;

        setSelectedTicketType((prev) => 
            isChecked
            ? [...prev, tickVal]
            : selectedTicketType.filter((t) => t !== tickVal)
        )
    }    

    const handleStarRating = (event: React.ChangeEvent<HTMLInputElement>) => {
        const starValue = event.target.value;
        const isChecked = event.target.checked;

        setSelectedStarRating((prev) => 
            isChecked
            ? [...prev, starValue]
            : prev.filter((s) => s !== starValue)
        );
    }

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
                <div className="rounded-lg border border-slate-200 p-5 h-fit sticky top-10 ">
                    <div className="space-y-5">
                        <h3 className="text-lg font-semibold border-b border-slate-300 pb-5 ">Filter by:</h3>
                        {/* TODO FILTERS */}
                        <StarRatingFilter selectedStars={selectedStarRating} onChange={handleStarRating}/>
                        <FlightTicketTypesFilter selectedTickType={selectedTicketType} onChange={handleTicketTypeChange} />
                        <PriceFilter selectedPrice={selectedPrice} onChange={(value) => setSelectedPrice(value)}/>
                    </div>
                    <div className="">

                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex justify-between items-center">
                        <span className="text-xl font-bold">
                            {flightData?.pagination.total} {(flightData?.pagination.total ?? 0) === 1 ? 'Flight': 'Flights'} found
                            that {(flightData?.pagination.total ?? 0) === 1 ? 'matches' : 'match'} your search criteria
                        </span>
                        <select 
                            className="p-2 border border-slate-300 rounded-md"
                            value={sortedOption} 
                            onChange={(event) => setSortedOption(event.target.value)}
                        >
                            <option value="">Sort By</option>
                            <option value="starRating">Star Rating</option>
                            <option value="flightPriceAsc">Flight Price (low to high)</option>
                            <option value="flightPriceDesc">Flight Price (high to low)</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-4 mt-4">
                        {flightData?.data.map((flight, index) => (
                        <FlightCard key={index} flight={flight}/>
                        ))}
                    </div>
            
                    <Pagination page={flightData?.pagination.page || 1} pages={flightData?.pagination.pages || 1} 
                    onPageChange={(page) => setPage(page)} />
                </div>
            </div>
        </div>
    )
}

export default Search;

