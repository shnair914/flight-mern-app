import React from 'react';
import { useState, useContext } from 'react';

type SearchContext = {
    arrival: string;
    departure: string;
    checkIn: Date;
    checkOut: Date;
    flightId: string;
    saveSearchValues: (
        arrival: string, 
        departure: string,
        checkIn: Date, 
        checkOut: Date,
        flightId?: string
    ) => void; 
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);


type SearchContextProviderProps = {
    children: React.ReactNode
    // The React.ReactNode type means the children can be any type of jsx content 
    // string components elements
}

export const SearchContextProvider = ( { children }: SearchContextProviderProps ) => {
    const [arrival, setArrival] = useState<string>("");
    const [departure, setDeparture] = useState<string>("");
    const [checkIn, setCheckIn] = useState<Date>(new Date());
    const [checkOut, setCheckOut] = useState<Date>(new Date());
    const [flightId, setFlightId] = useState<string>("");

    const saveSearchValues = (arrival: string, 
                              departure: string,
                              checkIn: Date, 
                              checkOut: Date, 
                              flightId?:string
                            ) => {
        setArrival(arrival);
        setDeparture(departure);
        setCheckIn(checkIn);
        setCheckOut(checkOut);
        if(flightId){
            setFlightId(flightId);
        }
    }
    
    return (
        <SearchContext.Provider value={{
            arrival,
            departure,
            checkIn,
            checkOut,
            flightId,
            saveSearchValues

        }}>
            {children}
        </SearchContext.Provider>
    )
};

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    return context as SearchContext;
}


/* 

   
*/