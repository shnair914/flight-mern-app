import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypesSection from "./TypesSection";
import ImagesSection from "./ImagesSection";
import type { FlightType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";
import TicketCountSection from "./TicketCountSection";

export type FlightFormData = {
    companyName: string;
    departureCity: string;
    arrivalCity: string;
    departureCountry: string;
    arrivalCountry: string;
    description: string;
    tickType: string[];
    tickCount: number;
    flightPrice: number;
    imageFiles: FileList;
    starRating: number;
    imageUrls: string[];
}

type Props = {
    flight?: FlightType;
    onSave: (FlightFormData: FormData)=> void;
    isLoading: boolean;
}

const ManageFlightForm = ({ flight, onSave, isLoading }: Props) => {
    const formMethods = useForm<FlightFormData>({
        defaultValues: {
            companyName: "",
            departureCity: "",
            arrivalCity: "",
            departureCountry: "",
            arrivalCountry: "",
            description: "",
            tickType: [],
            tickCount: 1,
            flightPrice: 1,
            imageFiles: new DataTransfer().files,
            starRating: 1,
            imageUrls: []

        }
    });
    const { handleSubmit, reset } = formMethods;
   
    useEffect(() => {
        if(flight){
            reset(flight);
        }

    }, [flight, reset]);

    const submit = handleSubmit((formDataJson: FlightFormData) => {
        const formData = new FormData();
        if(flight){
            formData.append("flightId", flight._id);
        }
        formData.append("companyName", formDataJson.companyName);
        formData.append("departureCity", formDataJson.departureCity);
        formData.append("arrivalCity", formDataJson.arrivalCity);
        formData.append("departureCountry", formDataJson.departureCountry);
        formData.append("arrivalCountry", formDataJson.arrivalCountry);
        formData.append("description", formDataJson.description);
        formData.append("flightPrice", formDataJson.flightPrice.toString());
        // formData.append("tickType", JSON.stringify(formDataJson.tickType));
        const tickTypes = Array.isArray(formDataJson.tickType) 
            ? formDataJson.tickType 
            : formDataJson.tickType ? [formDataJson.tickType] : [];
        tickTypes.forEach(type => {
            formData.append("tickType[]", type);
        });
        formData.append("tickCount", formDataJson.tickCount.toString());
        if(formDataJson.imageUrls){
            formDataJson.imageUrls.forEach((url, index) => {
                formData.append(`imageUrls[${index}]`, url);
            });
        }
        formData.append("starRating", formDataJson.starRating.toString());

        Array.from(formDataJson.imageFiles).forEach((imageFiles) => {
            formData.append(`imageFiles`, imageFiles);
        })
        
        onSave(formData);

    })
    return (
        <FormProvider {...formMethods}>
            <form action="" className="flex flex-col gap-8" onSubmit={submit}>
                <DetailsSection/>
                <TypesSection/> 
                <TicketCountSection/>
                <ImagesSection/>
                <span className="flex justify-end">
                    <button type="submit" className="px-5 py-4 bg-blue-500 font-semibold rounded-sm text-white
                    hover:cursor-pointer hover:bg-blue-400 disabled:bg-slate-400" disabled={isLoading}>
                        {isLoading? "Saving..." : "Save" }
                    </button>
                </span>
            </form>
        
        </FormProvider>
    )
}

export default ManageFlightForm


/* 
  
*/