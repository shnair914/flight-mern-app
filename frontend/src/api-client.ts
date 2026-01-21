import type { RegisterFormData } from "./pages/Register";
import type { LoginFormData } from "./pages/Login";
import { type FlightType } from '../../backend/src/shared/types';

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
    const response = await fetch(`${API_BASE_URL}api/flights`, {
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
    const response = await fetch(`${API_BASE_URL}api/flights`, {
        method: "GET",
        credentials: "include"
    });

    if(!response.ok){
        throw new Error("Flight does not exist");
    }

    return response.json();
}