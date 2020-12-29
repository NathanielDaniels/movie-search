import React, {useState} from "react";
import config from '../config'

export default function SearchMovies(){
    
    //states- input query, movies
    const [query, setQuery] = useState('');
    //create the state for movies, and update that sts
    const [movies, setMovies] = useState([]);
    
    const searchMovies = async (e) => {
        e.preventDefault();

        const mykey = config.MY_KEY;
                
        const url = `https://api.themoviedb.org/3/search/movie?api_key=5552fffb8a95ca814aa5e4b9d3a3c335&language=en-US&query=${query}&page=1&include_adult=false`;
        
        try {
            const res = await fetch(url);
            const data  = await res.json();
            console.log(data.results)
            setMovies(data.results)
        }catch(err){
            console.error(err);
        } 
    }
    
    return (
      <>
        <form className="form" onSubmit={searchMovies}>
            <label className="label" htmlFor="query">Movie Name</label>
            <input className="input" type="text" name="query"
                placeholder="i.e. Jurassic Park"
                value={query} onChange={(e) => setQuery(e.target.value)}
                />
            <button className="button" type="submit">Search</button>
        </form>
        <div className="card-list">
            {movies.map(movie => (
              <div className="card" key={movie.id}>
                <img className="card--image" src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`} alt={movie.title}/>
                <span>{movie.title}</span>
              </div>
            ))}
        </div>    
      </>
    )
}