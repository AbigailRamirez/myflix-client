import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";



export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      fetch("https://filmeo-app.herokuapp.com/movies")
        .then((response) => response.json())
        .then((data) => {
          const moviesFromApi = data.map((movie) => {
            // will update eventually with actors and genre
            return {
              id: movie._id,
              title: movie.Title,
              image: movie.ImagePath,
              director: movie.Director?.Name,
              description: movie.Description,
            };
          });
          setMovies(moviesFromApi);
        });
    }, []);
  
    if (!user) {
      return <LoginView onLoggedIn={(user) => setUser(user)} />;
    }
  
    if (selectedMovie) {
      return (
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      );
    }
  
    if (movies.length === 0) {
      return <div>The list is empty!</div>;
    }
  
    return (
      <div>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
    );
  };
  
