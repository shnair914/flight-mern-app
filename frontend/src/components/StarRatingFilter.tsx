export type Props = {
    selectedStars: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
    return(
        <div className="border-b border-slate-300 pb-5 ">   
            <h4 className="text-md font-semibold mb-2">Flight Rating</h4>
            {["1", "2", "3", "4", "5"].map((star, index) => (
                <label className="flex items-center space-x-2" key={index}>
                    <input 
                        type="checkbox" 
                        value={star} 
                        checked={selectedStars.includes(star)} 
                        onChange={onChange}/>
                    <span>{star} Stars</span>
                </label>
            ))}
        </div>
    )
}

export default StarRatingFilter;