import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import TrendingPage from "./components/TrendingPage";
import Popular from "./components/Popular";
import Movie from "./components/Movie";
import Tvshows from "./components/TvShow";
import People from "./components/People";
import MovieDetails from "./components/MovieDetails";
import TvDetails from "./components/TvDetails";
import PersonDetails from "./components/PersonDetails"
import Trailer from "./components/Templates/Trailer";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="bg-[#1F1E24] overflow-x-hidden overflow-y-auto flex w-screen h-screen">

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/trending" element={<TrendingPage/>}/>
        <Route path="/popular" element={<Popular/>}/>
        
        <Route path="/movies" element={<Movie/>}/> 
        <Route path="/movie/details/:id" element={<MovieDetails/>}>
          <Route path="/movie/details/:id/trailer" element={<Trailer/>}/> 
        </Route>
        
        <Route path="/tv-show" element={<Tvshows/>}/>
        <Route path="/tv/details/:id" element={<TvDetails/>}>
          <Route path="/tv/details/:id/trailer" element={<Trailer/>}/> 
        </Route>
        
        <Route path="/people" element={<People/>}/>
        <Route path="/people/details/:id" element={<PersonDetails/>}/>

        <Route path="*" element={<NotFound/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
