export type Props = {
    selectedPrice?: number;
    onChange: (value?: number) => void
}

const PriceFilter = ({selectedPrice, onChange}: Props) => {
    return (
        <div className="border-b border-slate-300 mb-2">
            <h4 className="font-semibold text-md mb-2">Max Price</h4>

            <label className="flex items-center space-x-2 mb-4">
                <select
                    className='p-2 border border-slate-300 rounded-md w-full' 
                    value={selectedPrice}
                    onChange={(event) => onChange(event.target.value ? parseInt(event.target.value): undefined)}
                >
                    <option value="">Select Max Price</option>
                    {[100, 200, 500, 1000, 1500].map((price) => (
                        <option value={price}>{price}</option>
                    ))}
                </select>
            </label>
        </div>
    )
}

export default PriceFilter;