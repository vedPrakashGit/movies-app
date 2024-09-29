import { useState, useEffect} from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import Skeleton from "react-loading-skeleton";

export default function SingleMovie(){
    const [movie, setMovie] = useState("");
    const { id }  = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {    
                axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=16f5e4d6873015b6724ccd94018bd57a`).then((obj) => {
                    setMovie(obj.data);       
                    setLoading(false);
                });
        }, 2000);
    }, [id])

    return(
       <>
       
        {   loading ? 
                <div className="container w-10/12 mx-auto">
                    <div className="w-full flex mt-10 h-96">
                        <div className="w-6/12 d-block">
                            <Skeleton className="h-72"/>
                        </div>
                        <div className="w-6/12 ps-5">
                            <Skeleton className="text-4xl font-extrabold"></Skeleton>
                            <div className="mt-3 mb-3">
                                <Skeleton className="h-28"></Skeleton>
                            </div>
                            <div className="w-64">
                                <Skeleton className="mb-2"></Skeleton>
                            </div>
                            <div className="w-64">
                                <Skeleton className="mb-2"></Skeleton>
                            </div>
                            <div className="w-64">
                                <Skeleton className="mb-2"></Skeleton>
                            </div>
                            <div className="w-64">
                                <Skeleton className="mb-2"></Skeleton>
                            </div>
                        </div>
                    </div>
                </div>            
             : 
            <div className="container flex w-10/12 mx-auto mt-10">
                <div className="w-6/12">
                    <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="w-full" alt="Movie"/>
                </div>
                <div className="w-6/12 ps-5">
                    <h3 className="text-4xl font-extrabold">{movie.original_title}</h3>
                    <p className="mt-3 mb-3">{movie.overview}</p>
                    <div className="mb-2">Popularity: <label className="font-medium">{movie.popularity}</label></div>
                    <div className="mb-2">Released on: <label className="font-medium">{movie.release_date}</label></div>
                    <div className="mb-2">Vote Average: <label className="font-medium">{movie.vote_average}</label></div>
                    <div className="mb-2">Vote Count: <label className="font-medium">{movie.vote_count}</label></div>

                    <div className="py-3">
                        <button onClick={() => navigate(-1)} className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"><i className="fa-solid fa-arrow-left"></i>&nbsp;&nbsp; Go Back</button>
                    </div>
                </div>
            </div>
        }
       </>
    )
}