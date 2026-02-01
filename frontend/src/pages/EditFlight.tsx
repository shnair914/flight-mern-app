import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import ManageFlightForm from "../forms/ManageFlightForms/ManageFlightForm";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const EditFlight = () => {

    const { showToast } = useAppContext();  

    const { flightId } = useParams();
    const navigate = useNavigate();

    const { data: flight, isError, error, isLoading } = useQuery({
        queryKey: ["fetchByHotelId"],
        queryFn: () => apiClient.getFlightById(flightId || ''), 
        enabled: !!flightId
    });

    const { mutate } = useMutation({
        mutationFn: apiClient.updateFlight,
        onSuccess: () => {
            showToast({message:"Update Successful!", type: "SUCCESS"});
            navigate('/my-flights');
        },
        onError: () => {    
            showToast({message: "Error saving flight", type: "ERROR"});
        }
    })

    const handleSave = (flightFormData: FormData) => {
        mutate(flightFormData);
       
    }

    if (isLoading){
        return <span>Loading...</span>
    }

    if (isError){
        return <span className="text-red-500">{error.message}</span>
    }

    if (!flight) {
        return <span className="text-red-500">Flight not found.</span>;
    }
    return <ManageFlightForm flight={flight} onSave={handleSave} isLoading={isLoading}/>
}

export default EditFlight;