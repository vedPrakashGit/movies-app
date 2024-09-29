import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <>
            <nav className="container mx-auto flex items-center py-2.5">
                <Link to="/">
                    <img src="https://uxwing.com/wp-content/themes/uxwing/download/video-photography-multimedia/movie-icon.png" width={35} alt="Movie Logo"/> 
                </Link>
                <Link to="/" className="mx-10 font-medium hover:text-indigo-400">Movies</Link>
                <Link to="/watchlist" className='font-medium hover:text-indigo-400'>Watchlist</Link>
            </nav>
        </>
    )
}

export default Navbar;