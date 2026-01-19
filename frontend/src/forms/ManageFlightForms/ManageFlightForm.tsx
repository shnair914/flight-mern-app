import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypesSection from "./TypesSection";
import ImagesSection from "./ImagesSection";

export type FlightFormData = {
    companyName: string;
    departureCity: string;
    arrivalCity: string;
    departureCountry: string;
    arrivalCountry: string;
    description: string;
    tickType: string[];
    flightPrice: number;
    imageFiles: FileList;
}

type Props = {
    onSave: (FlightFormData: FormData)=> void
    isLoading: boolean
}

const ManageFlightForm = ({ onSave, isLoading }: Props) => {
    const formMethods = useForm<FlightFormData>();
    const { handleSubmit } = formMethods;

    const submit = handleSubmit((formDataJson: FlightFormData) => {
        const formData = new FormData();
        formData.append("companyName", formDataJson.companyName);
        formData.append("departureCity", formDataJson.departureCity);
        formData.append("arrivalCity", formDataJson.arrivalCity);
        formData.append("departureCountry", formDataJson.departureCountry);
        formData.append("arrivalCountry", formDataJson.arrivalCountry);
        formData.append("description", formDataJson.description);
        formData.append("flightPrice", formDataJson.flightPrice.toString());
        // (formDataJson.tickType || []).forEach((type, index) => {
        //     formData.append(`tickType[${index}]`, type)
        // })
        formData.append("tickType", JSON.stringify(formDataJson.tickType));
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