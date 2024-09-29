import {useState, useEffect} from 'react';
import Movie from "./Movie";
import axios from 'axios';
import Pagination from './Pagination';
import Skeleton from 'react-loading-skeleton';

const Movies = (props) => {
    const {watchList, handleWatchList, removeWatchList, page, handlePrev, handleNext} = props;
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {        
        axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=16f5e4d6873015b6724ccd94018bd57a&page=${page}`).then((obj) => {
            setMovies(obj.data.results);       
            setLoading(false);
        });
    }, [page]);

    console.log(movies);

    return (
        <>
            <h1 className="text-2xl font-bold text-center pt-5 pb-3 mx-3 my-3">{loading ? <Skeleton/> : 'Trending Movies'}</h1>
            <div className="container mx-auto pb-5 flex flex-wrap gap-6 justify-around">
                {
                    movies.map( (movieDetails) => {
                        return <Movie key={movieDetails.id} loading={loading} movieObj={movieDetails}  id={movieDetails.id} name={movieDetails.title} watchList={watchList} handleWatchList={handleWatchList} removeWatchList={removeWatchList}/>
                    })
                }
                
            </div>
            <Pagination page={page} handlePrev={handlePrev} handleNext={handleNext}/>
        </>
    )
}

export default Movies;