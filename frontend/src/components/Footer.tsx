import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="bg-blue-700 py-14">
            <div className="container mx-auto flex items-center justify-between">
                <span className="text-3xl font-bold text-white tracking-tight">Mernflights.com</span>
                <div className="space-x-3 tracking-tight">
                    <Link to='/' className="text-white font-bold hover:text-gray-200">Privacy Policy</Link>
                    <Link to='/' className="text-white font-bold hover:text-gray-200">Terms of Service</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer;