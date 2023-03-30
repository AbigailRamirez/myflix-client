import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";



export const MainView = () => {
<<<<<<< Updated upstream
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Spirited Away",
      image:
        "https://upload.wikimedia.org/wikipedia/en/d/db/Spirited_Away_Japanese_poster.png",
      director: "Hayao Miyazaki",
      description: "During her family''s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts."
    },
    {
      id: 2,
      title: "Howl's Moving Castle",
      image:
        "https://upload.wikimedia.org/wikipedia/en/a/a0/Howls-moving-castleposter.jpg?20200627065434",
      director: "Hayao Miyazaki",
      description: "The solitary life of an artificial man - who was incompletely constructed and has scissors for hands - is upended when he is taken in by a suburban family."
    },
    {
      id: 3,
      title: "Charlie and the Chocolate Factory",
      image:
        "https://upload.wikimedia.org/wikipedia/en/1/17/Charlie_and_the_Chocolate_Factory_%28film%29.png",
      director: "Tim Burton",
      description: "A young boy wins a tour through the most magnificent chocolate factory in the world, led by the world''s most unusual candy maker."
=======
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(null);
  
    useEffect(() => {
        fetch("https://filmeo-app.herokuapp.com/movies")
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.map((movie) => {
                //will update eventually with actors and genre
                return {
                    id: movie._id,
                    title: movie.Title,
                    image: movie.ImagePath,
                    director: movie.Director?.Name,
                    description: movie.Description
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
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
>>>>>>> Stashed changes
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
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
