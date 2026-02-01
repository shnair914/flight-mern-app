import { flightTypes } from "../config/flight-options-config";

export type Props ={
    selectedTickType: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement> ) => void
}

const FlightTicketTypesFilter = ({selectedTickType, onChange}: Props) => {
    return(
        <div className="border-b border-slate-300 pb-5">
            <h4 className="text-md font-semibold mb-2">Ticket Type</h4>
            {flightTypes.map((type, index) => (
                <label className='flex items-center space-x-2' key={index}>
                    <input 
                        type="checkbox"
                        value={type}
                        checked={selectedTickType.includes(type)}
                        onChange={onChange} 
                    />
                    <span>{type}</span>
                </label>
            ))}
        </div>
    )
}

export default FlightTicketTypesFilter;

/* 
    

*/