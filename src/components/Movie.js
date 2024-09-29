import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

export default function Movie(props){
    const {movieObj, watchList, removeWatchList, handleWatchList} = props;
    console.log(props);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    })

    const isObjContain = (movie) => {
        for(let i = 0; i < watchList.length; i++){
            if(movie.id === watchList[i].id){
                return true;
           }
        }
        return false;
    }


    return(
        loading ? <div className="w-48 h-72"><Skeleton className="w-full h-full"/></div> : <div className="relative "><Link to={`/movies/${movieObj.id}`} className="d-block flex items-end overflow-hidden w-48 duration-500 bg-cover bg-center h-72 rounded-2xl hover:cursor-pointer hover:scale-105" style={{backgroundImage: `url("https://image.tmdb.org/t/p/original${movieObj.poster_path}")`}}>
            <label className="block text-center w-full py-2 bg-red-950/[.5] text-white text-xs font-medium px-1">{movieObj.title}</label>
        </Link>{isObjContain(movieObj) ? <label className="watchlist-icon absolute p-1 top-2 right-1.5 cursor-pointer bg-gray-600 rounded" onClick={(e) => removeWatchList(e, movieObj)}>&#10060;</label> : <label className="watchlist-icon absolute p-1 top-2 right-1.5 cursor-pointer bg-gray-600 rounded" onClick={(e) => handleWatchList(e, movieObj)}>&#128512;</label>}</div>
    )
}