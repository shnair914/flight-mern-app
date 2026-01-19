import { useFormContext } from "react-hook-form"
import type { FlightFormData } from "./ManageFlightForm";


const ImagesSection = () => {
    const  { register, formState: {errors}} = useFormContext<FlightFormData>();  
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="flex flex-col gap-4 border border-slate-400 rounded p-4">
                <input type="file" multiple accept="image/*" className="w-1/4 text-black
                font-normal bg-slate-300 px-3 py-2 border rounded-sm cursor-pointer" {...register("imageFiles", {
                    validate: (imageFile) => {
                        const totalLength = imageFile.length;

                        if(totalLength === 0){
                            return "At least one image should be added";
                        }

                        if(totalLength > 6){
                            return "Total images can't be greater than 6";
                        }

                        return true;
                    }
                })}/>
            </div>
            {errors.imageFiles && (
                <span className="text-red-500">{errors.imageFiles?.message}</span>
            )}
        </div>
    )
}

export default ImagesSection;