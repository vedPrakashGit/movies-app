import './App.css';
import React, {useState, useEffect} from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Watchlist from './components/Watchlist';
import Movies from './components/Movies';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';
import SingleMovie from './components/SingleMovie';

function App() {
  const [watchList, setWatchList] = useState([]);
  const [page, setPage] = useState(1);

    const handleWatchList = (e, movieObj) => {
        e.stopPropagation();
        let updatedWatchList = [...watchList, movieObj]
        localStorage.setItem("mvoieApp", JSON.stringify(updatedWatchList));
        setWatchList(updatedWatchList);
    }
    
  const removeWatchList = (e, movieObj) => {
      e.stopPropagation();
      let filteredWatchList = watchList.filter(movie => movie.id !== movieObj.id);
      localStorage.setItem("mvoieApp", JSON.stringify(filteredWatchList));
      setWatchList(filteredWatchList);
  }

  const handlePrev = () => {
      if(page > 1){
          setPage(page - 1);
      }        
  }
  const handleNext = () => {
      setPage(page + 1);
  }

  useEffect(()=> {
    let getMoviesFromStorage = localStorage.getItem("mvoieApp");
    if(!getMoviesFromStorage){
        return;
    }
    setWatchList(JSON.parse(getMoviesFromStorage));
}, [setWatchList])

  return (
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<> <Banner/> <Movies watchList={watchList} handleWatchList={handleWatchList} removeWatchList={removeWatchList} setWatchList={setWatchList} page={page} handlePrev={handlePrev} handleNext={handleNext}/> </>}/>
          <Route path="/watchlist" element={<Watchlist watchList={watchList} removeWatchList={removeWatchList} setWatchList={setWatchList}/>}/>
          <Route path="/movies/:id" element={<SingleMovie/>}/>
        </Routes>
        
      </BrowserRouter>
  );
}

export default App;
