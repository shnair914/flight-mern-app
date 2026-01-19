import { useFormContext } from "react-hook-form";
import type { FlightFormData } from "./ManageFlightForm";

const DetailsSection = () => {
    const { register, formState: {errors} } = useFormContext<FlightFormData>();

    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-bold mb-3">Add Flight</h1>
            <div className="flex flex-col">
                <label htmlFor="" className="font-semibold mb-2">Company Name</label>
                <input type="text" className="rounded-sm bg-slate-100 px-3 py-2 border border-gray-300"
                {...register("companyName", {required: "This field is required"})}/>
                {errors.companyName && (
                    <span className="text-red-500">{errors.companyName.message}</span>
                )}
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
                <span className="flex flex-col flex-1">
                    <label htmlFor="" className="font-semibold mb-2">Arrival City</label>
                    <input type="text" className="rounded-sm bg-slate-100 px-3 py-2 border border-gray-300"
                    {...register("arrivalCity", {required: "This field is required"})}/>
                    {errors.arrivalCity && (
                            <span className="text-red-500">{errors.arrivalCity.message}</span>
                        )}
                </span>
                <span className="flex flex-col flex-1">
                    <label htmlFor="" className="font-semibold mb-2">Departure City</label>
                    <input type="text" className="rounded-sm bg-slate-100 px-3 py-2 border border-gray-300"
                    {...register("departureCity", {required: "This field is required"})}/>
                    {errors.departureCity && (
                            <span className="text-red-500">{errors.departureCity.message}</span>
                        )}
                </span>
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
                <span className="flex flex-col flex-1">
                    <label htmlFor="" className="font-semibold mb-2">Arrival Country</label>
                    <input type="text" className="rounded-sm bg-slate-100 px-3 py-2 border border-gray-300"
                    {...register("arrivalCountry", {required: "This field is required"})}/>
                    {errors.arrivalCountry && (
                            <span className="text-red-500">{errors.arrivalCountry.message}</span>
                        )}
                </span>
                <span className="flex flex-col flex-1">
                    <label htmlFor="" className="font-semibold mb-2">Departure Country</label>
                    <input type="text" className="rounded-sm bg-slate-100 px-3 py-2 border border-gray-300"
                    {...register("departureCountry", {required: "This field is required"})}/>
                    {errors.departureCountry && (
                            <span className="text-red-500">{errors.departureCountry.message}</span>
                        )}
                </span>
            </div>
            <div className="flex flex-col">
                <label htmlFor="" className="font-semibold mb-2">Description</label>
                <textarea rows={10} className="rounded-sm bg-slate-100 px-3 py-2 border border-gray-300"
                {...register("description", {required: "This field is required"})}/>
                {errors.description && (
                    <span className="text-red-500">{errors.description.message}</span>
                )}
            </div>
            <div className="flex flex-col max-w-[40%]">
                <label htmlFor="" className="font-semibold mb-2">Flight Price</label>
                <input type="number" min={1} className="rounded-sm bg-slate-100 px-3 py-2 border border-gray-300"
                {...register("flightPrice", {required: "This field is required"})}/>
                {errors.flightPrice && (
                    <span className="text-red-500">{errors.flightPrice.message}</span>
                )}
            </div>
        </div>
    )
}

export default DetailsSection;