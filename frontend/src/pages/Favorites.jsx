import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites (){
    const {favorites} = useMovieContext()

    if (favorites){
       return ( 
       <div className="favorites">
            <h2>Favorite Movies</h2>
            <div className="movie-grid">
            {favorites.map((movie) => (<MovieCard movie={movie} key={movie.id}/>))}
         </div>
        </div>)
    }

    return <div className="favorites-empty">
        <h2>NO Favorites Yet</h2>
        <p>This page is empty. You haven't saved anything here yet</p>
    </div>
}

export default Favorites;