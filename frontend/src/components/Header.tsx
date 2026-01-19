import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import SignOutButton from './SignOutButton';

const Header = () => {
    const { isLoggedIn } = useAppContext();

    return (
        <div className="bg-blue-700 py-6 ">
            <div className="container mx-auto flex items-center justify-between">
                <span className='text-3xl text-white font-bold tracking-tight hover:text-gray-200'>
                    <Link to='/' className=''>Mernflights.com</Link>
                </span>
                <span className='flex space-x-2'>
                    { isLoggedIn ? 
                        <>
                            <Link to="/flight-bookings" className='p-4 bg-green-500 text-white rounded-sm 
                            font-semibold hover:bg-green-400'>Bookings</Link>
                            <Link to="/flights" className='p-4 bg-red-500 text-white rounded-sm 
                            font-semibold hover:bg-red-400'>Flights</Link>
                            <SignOutButton/>
                        </> :
                            <Link to='/sign-in' className='
                             bg-white text-blue-600 py-4 
                              px-3 hover:cursor-pointer hover:bg-gray-200
                              flex items-center rounded-sm font-semibold tracking-tight'>Sign In</Link>
                        }
                    
                </span>
            </div>
        </div>
    )
}

export default Header;