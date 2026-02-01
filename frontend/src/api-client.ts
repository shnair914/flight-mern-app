import type { RegisterFormData } from "./pages/Register";
import type { LoginFormData } from "./pages/Login";
import { type FlightType } from '../../backend/src/shared/types';
import { type FlightSearchResponse } from "../../backend/src/shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}api/users/register`, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    const responseBody = await response.json();

    if(!response.ok){
        throw new Error(responseBody.message);
    }
}

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}api/auth/validate-token`, {
        method: "GET",
        credentials: "include",
    });


    if(!response.ok){
        throw new Error("Token invalid");
    }

    return response.json();
}

export const login = async (formData: LoginFormData) => {
    const response = await fetch(`${API_BASE_URL}api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    const responseBody = await response.json();

    if(!response.ok){
        throw new Error(responseBody.message);
    }

}

export const logout = async () => {
    const response = await fetch(`${API_BASE_URL}api/auth/logout`, {
        method: "POST",
        credentials: "include", 
    });

    if(!response.ok){
        throw new Error("Internal Server Error");
    }

    return response.json();
} 

export const addMyFlight = async (flightFormData:FormData) => {
    const response = await fetch(`${API_BASE_URL}api/my-flights`, {
        method: "POST",
        credentials: "include",
        body: flightFormData
    });

    if (!response.ok){
        throw new Error("Failed to add flight");
    }

    return response.json();
}

export const getFlights = async(): Promise<FlightType[]> => {
    const response = await fetch(`${API_BASE_URL}api/my-flights`, {
        method: "GET",
        credentials: "include"
    });

    if(!response.ok){
        throw new Error("Flight does not exist");
    }

    return response.json();
}

export const getFlightById = async(flightId: string): Promise<FlightType> => {
    
    const response = await fetch(`${API_BASE_URL}api/my-flights/${flightId}`, {
        method: "GET",
        credentials: "include",
    });

    if(!response.ok){
        throw new Error("Error fetching flights");
    }

    return response.json();

}

export const updateFlight = async(flightformData: FormData) => {
    const response = await fetch(`${API_BASE_URL}api/my-flights/${flightformData.get("flightId")}`, {
        method: "PUT",
        credentials: "include",
        body: flightformData
    });

    if(!response.ok){
        throw new Error("Failed to update Flight");
    }

    return response.json();

}

export type SearchParams = {
    arrival?: string;
    departure?: string;
    checkIn?: string;
    checkOut?: string;
    page?: string;
    tickType?: string[];
    starRating?: string[];
    maxPrice?: string;
    sortOption?: string;
}

export const searchFlights = async(searchParams: SearchParams): Promise<FlightSearchResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append("arrival", searchParams.arrival || '');
    queryParams.append("departure", searchParams.departure || '');
    queryParams.append("checkIn", searchParams.checkIn || '');
    queryParams.append("checkOut", searchParams.checkOut || '');
    queryParams.append("page", searchParams.page || '');

    queryParams.append("maxPrice", searchParams.maxPrice || '');
    queryParams.append("sortOption", searchParams.sortOption || '');
    searchParams.tickType?.forEach((tickType) => queryParams.append("tickType", tickType));
    searchParams.starRating?.forEach((star) => queryParams.append("starRating", star));

    const response = await fetch(`${API_BASE_URL}api/flight/search?${queryParams}`);

    if(!response.ok){
        throw new Error("Error fetching flights");
    }

    return response.json();

}



/* 


*/