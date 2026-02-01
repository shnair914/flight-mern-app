import { useMutation } from "@tanstack/react-query";
import ManageFlightForm from "../forms/ManageFlightForms/ManageFlightForm";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const AddFlight = () => {
    const { showToast } = useAppContext();

    const navigate = useNavigate();
    const { mutate, isPending } = useMutation({
        mutationFn: apiClient.addMyFlight,
        onSuccess: async() => {
            showToast({message: "Flight Added!", type: "SUCCESS"});
            navigate('/my-flights') ;
        },
        onError: () => {
            showToast({message: "Error saving hotel", type: "ERROR"});
            console.log()
        }

    }); 

    const handleSave = (flightFormData: FormData) => {
        mutate(flightFormData);
    }

    return (
        <ManageFlightForm onSave={handleSave} isLoading={isPending}/>
    )
}

export default AddFlight;


