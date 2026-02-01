import { useFormContext } from "react-hook-form";
import { flightTypes } from "../../config/flight-options-config";
import type { FlightFormData } from "./ManageFlightForm";

const TypesSection = () => {
    const { register, watch, formState: {errors} } = useFormContext<FlightFormData>();
    const watchType = watch("tickType");
    return (
        <div>
            <h2 className="font-bold text-3xl my-3">Types</h2>
            <div className="grid grid-cols-4 gap-4">
                { flightTypes.map((type) => (
                    <label key={type} className={
                        watchType?.includes(type) ? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold" 
                        : "cursor-pointer bg-slate-200 text-sm rounded-full px-4 py-2 font-semibold"
                    }>
                        <input type="checkbox" className="hidden" value={type}
                        checked={watchType?.includes(type)}
                        {...register("tickType", {required: "This field is required"})}/>
                        <span className="">{type}</span>
                    </label>
                ))}
            </div>
               {errors.tickType && (
                        <span className="text-red-500">{errors.tickType.message}</span>
                )}
        </div>
       
    )
}

export default TypesSection;


