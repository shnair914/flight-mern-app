import { useSearchContext } from "../contexts/SearchContext";
import { useState, type FormEvent } from "react";
import { MdTravelExplore } from "react-icons/md";
import { DatePicker } from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { useAppContext } from "../contexts/AppContext";

const SearchBar = () => {
    const search = useSearchContext();

    const [arrival, setArrival] = useState<string>(search.arrival);
    const [departure, setDeparture] = useState<string>(search.departure);
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
    const navigate = useNavigate();
    const { isLoggedIn, showToast } = useAppContext();

    const handleClear = () => {
        setArrival("");
        setDeparture("");
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        search.saveSearchValues(
            arrival,
            departure,
            checkIn,
            checkOut
        )

        if(!isLoggedIn){
            showToast({message: "You must be logged in to search!", type: "ERROR"});
        }
        navigate('/search');
    }

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    return(
        <form onSubmit={handleSubmit} className="">
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-2 2xl:grid-cols-6 -mt-8 p-3 bg-orange-400 rounded shadow-md
            ">
                <div className="flex flex-row items-center  bg-white p-2 rounded-sm truncate">
                    <MdTravelExplore size={25} className="mr-2"/>
                    <input 
                        type="text" 
                        placeholder="arriving from?"
                        className="text-md w-50 focus:outline-none "
                        value={arrival}
                        onChange={(event) => setArrival(event.target.value)}
                    />
                </div>

                <div className="flex flex-row items-center bg-white p-2 rounded-sm truncate">
                        <MdTravelExplore size={25} className="mr-2"/>
                        <input type="text" className="text-md w-50 focus:outline-none "
                            placeholder="departing from?"
                            value={departure}
                            onChange={(event) => setDeparture(event.target.value)}
                        />
                
                </div>
                <div className="truncate">
                    <DatePicker
                        selected={checkIn}
                        onChange={(date: Date | null) => setCheckIn(date as Date)}
                        selectsStart
                        startDate={checkIn}
                        endDate={checkOut}
                        minDate={minDate}
                        maxDate={maxDate}
                        placeholderText="Check-in Date"
                        className="min-w-full bg-white p-2 focus:outline-none rounded-sm cursor-pointer"
                        wrapperClassName="min-w-full"
                    />
                </div>
                <div className="truncate">
                    <DatePicker
                        selected={checkOut}
                        onChange={(date: Date | null) => setCheckOut(date as Date)}
                        selectsStart
                        startDate={checkIn}
                        endDate={checkOut}
                        minDate={minDate}
                        maxDate={maxDate}
                        placeholderText="Check-out Date"
                        className="min-w-full bg-white p-2 focus:outline-none rounded-sm cursor-pointer"
                        wrapperClassName="min-w-full"
                    />
                </div>
                <div className="flex gap-2 ">
                    <button className="bg-blue-500 cursor-pointer hover:bg-blue-400 p-2 
                    rounded-sm text-white font-semibold min-w-full " >Search</button>
                    <button className="bg-red-500 cursor-pointer hover:bg-red-400 p-2
                    rounded-sm text-white font-semibold min-w-full " onClick={handleClear}>Clear</button>
                </div>
            </div>
            

        </form>
    )
}

export default SearchBar;