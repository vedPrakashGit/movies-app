import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

let genres = {
  28:"Action", 
  12:"Adventure", 
  16: "Animation" ,
  35: "Comedy" ,
  80: "Crime" ,
  99: "Documentary" ,
  18: "Drama" ,
  10751: "Family",    
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  78: "Science Fiction", 
  770: "TV Movie", 
  53: "Thriller" ,
  10752: "War",    
  37: "Western"
};

const Watchlist = (props) => {
  const {watchList, removeWatchList, setWatchList} = props;
  const [genreName, setGenreName] = useState(["All Genre"]);
  const [curGenre, setCurGenre] = useState("All Genre");
  const [search, setSearch] = useState("");

  useEffect(() => {    
      let allgenres = new Set();
      watchList.forEach((movieObj) => {
        console.log(movieObj);
        allgenres.add(genres[movieObj.genre_ids[0]]);
      })
      setGenreName(["All Genre", ...allgenres]);
  }, [watchList]);

  const handleFilter = (genreName) => {
    setCurGenre(genreName); 
  }

  const handleSearch = (e) => {
    let typedTitle = e.target.value;
    setSearch(typedTitle);
  } 

  const handleSortIncreasing = () => {
    let sortedList = [...watchList.sort((movie1, movie2) => movie1.vote_count - movie2.vote_count)];
    console.log(sortedList);
    setWatchList(sortedList);
  }
  const handleSortDecreasing = () => {
    let sortedList = [...watchList.sort((movie1, movie2) => movie2.vote_count - movie1.vote_count)];
    setWatchList(sortedList);
  }

    return (
        <>
        <div className="container mx-auto pb-5">
            <h1 className="text-center mb-5 font-bold text-3xl">Watchlist</h1>
            <div className="filter-button flex justify-center w-full mb-4 gap-3">
              {genreName.map((genre, idx) => {
                return <button onClick={() => handleFilter(genre)} key={`genre${idx}`} className={`py-2 px-4 ${curGenre === genre ? 'bg-blue-500 hover:bg-blue-700 focus:ring-blue-400 text-white' : 'bg-gray-200 hover:bg-gray-300 focus:ring-gray-400'} focus:ring-opacity-75 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2`}>{genre}</button>
              })}
            </div>
            <div className='flex justify-center items-center py-3 mb-2'>
              <label className="me-2">Search Movies</label>
              <input onChange={handleSearch} className="border w-80 p-2 border-solid border-1 border-gray-100 bg-slate-100 rounded placeholder-shown:border-gray-500 ..." placeholder="Type here to search" />
            </div>

            <table className="w-full text-center">
                <thead className="border-b-2 py-2">
                    <tr>
                        <th className="text-left">Name</th>
                        <th><button onClick={handleSortIncreasing} className="fa-solid fa-chevron-up me-2 "></button>Ratings<button onClick={handleSortDecreasing} className="fa-solid ms-2 fa-chevron-down"></button></th>
                        <th>Popularity</th>
                        <th>Genre</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                      watchList.length === 0 ? <tr>
                      <td colSpan={5}>
                        <h2 className='text-lg mt-5 font-bold'>Currently, there is no movie to display here.</h2>
                        </td>
                      </tr>
                      : watchList.filter(movieObj => {
                        if(curGenre === "All Genre"){
                          return true;
                        }else{  
                          return genres[movieObj.genre_ids[0]] === curGenre;
                        }
                      }).filter(movieObj => {
                        return movieObj.title.toLowerCase().includes(search.toLowerCase());
                      })
                        .map((movie => {
                          return  <tr key={movie.id}>
                          <td className="flex items-center py-2"><Link to={`/movies/${movie.id}`}><img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="poster" width="125"/></Link> <Link to={`/movies/${movie.id}`}><label className="ms-2 cursor-pointer inline-block">{movie.title}</label></Link></td>
                          <td className="py-2">{movie.vote_count}</td>
                          <td className="py-2">{movie.popularity}</td>
                          <td className="py-2">{genres[movie.genre_ids[0]]}</td>
                          <td><button className="text-red-700" onClick={(e) => removeWatchList(e, movie)}>Delete</button></td>
                      </tr> 
                      }))
                    }                   
                </tbody>
            </table>

        </div>
        </>
    )
}

export default Watchlist;