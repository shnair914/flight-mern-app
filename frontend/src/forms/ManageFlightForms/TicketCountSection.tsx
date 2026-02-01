import { useFormContext } from "react-hook-form";
import type { FlightFormData } from "./ManageFlightForm";

const TicketCountSection = () => {

    const { register, formState: {errors} } = useFormContext<FlightFormData>();


    return (
        <div className="">
            <h2 className="text-3xl font-bold mb-3">Ticket Count</h2>
            <div className="flex items-center bg-slate-300 p-4 ">
                <label htmlFor="" className="mb-2 mr-4">Count:</label>
                <input type="number" min={1} className="rounded-sm bg-slate-100 px-3 py-2 border border-gray-300 w-110"
                {...register("tickCount", {required: "This field is required"})}/>
            </div>
            {errors.tickCount && (
                <span className="text-red-500">{errors.tickCount.message}</span>
            )}
        </div>
    )
} 

export default TicketCountSection;