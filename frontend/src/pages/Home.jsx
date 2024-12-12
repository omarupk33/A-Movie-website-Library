import MovieCard from "../components/MovieCard";
import {useState, useEffect} from "react";
import "../css/Home.css"
import { getPopularMovies, searchMovies} from "../services/api";

function Home(){

const [searchQuery, setSearchQuery] = useState("");
const [movies, setMovies] = useState([]);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(true);


useEffect(() => {
    const loadPopularMovies = async () =>{
        try{
            const popularMovies= await getPopularMovies();
            setMovies(popularMovies)  
    
    }   catch(err){
            console.log(err);
            setError("Failed to load movies...") 

    }   finally{
            setLoading(false)
        }
    }
loadPopularMovies()
}, [])


// Error occurred here
const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return
    if (loading) return
    setLoading(true)
    try{ 
        const searchResults = await searchMovies(searchQuery)
        setMovies(searchResults)
        setError(null)
        } catch (err){
            console.log(err);
            setError("Failed to search movies...") 
        } finally{
                setLoading(false)
        }     
setSearchQuery('')
}; 


    return <div className="home">
            <form className="search-form" onSubmit={handleSearch} >
                <input className="search-input"
                        type="text" 
                        placeholder="Search for movies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        />
                <button className="search-button" type="submit">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (<div className="loading">Loading...</div>)
            :(
            <div className="movie-grid">
                {movies.map((movie) => (<MovieCard movie={movie} key={movie.id}/>
                ))}
            </div>)
            }

         </div>
        
}

export default Home;