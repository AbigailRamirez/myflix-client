import PropTypes from "prop-types";
import { Row, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router"
import { MovieCard } from "../movie-card/movie-card";
import { MainView } from "../main-view/main-view";
import { useEffect, useState } from "react";



export const MovieView = ({ movies, user, favoriteMovies }) => {
  const { movieId } = useParams();
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const movie = movies.find((m) => m.id === movieId);

  const [movieExists, setMovieExists] = useState(false);
  const [disableRemove, setDisableRemove] = useState(true)
  const [userFavoriteMovies, setUserFavoriteMovies] = useState(storedUser.FavoriteMovies ? storedUser.FavoriteMovies: favoriteMovies);

  console.log(user)

  // AddFavMovie
  const addFavoriteMovie = async() => {
    const favoriteMovie = await fetch(`https://filmeo-app.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json", 
        }
      })

      console.log(storedToken)

    const response = await favoriteMovie.json()
      setUserFavoriteMovies(response.FavoriteMovies)
      if (response) {
        alert("Movie added to favorites");
        localStorage.setItem("user", JSON.stringify (response))
        window.location.reload(); 
      } else {
        alert("Something went wrong");
      }    
  }

  const removeFavoriteMovie = async() => {
    const favoriteMovie = await fetch (`https://filmeo-app.herokuapp.com/users/${user.Username}/movies/${movieId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json"
      }
    })     
    const response = await favoriteMovie.json()
      console.log(response)
      if (response) {
        alert("Movie removed from favorites");
        localStorage.setItem("user", JSON.stringify (response))
        window.location.reload(); 
      } else {
        alert("Something went wrong");
      }
  };

  const movieAdded = () => {
    const hasMovie = userFavoriteMovies.some((m) => m === movieId)
      console.log("userFavMov", userFavoriteMovies)
      console.log("movieId", movieId)
      if (hasMovie) {
        setMovieExists(true)
      }
  };

  const movieRemoved = () => {
    const hasMovie = userFavoriteMovies.some((m) => m === movieId)
      if (hasMovie) {
        setDisableRemove(false)
      }
  };

  console.log("movieExists", movieExists)

  useEffect (()=> {
    movieAdded()
    movieRemoved()
  },[])

  return (
    <Row>
        <Col>
          <div className="movie-view">
            <div className="movie-poster">
              <img src={movie.image} />
            </div>
            <div className="movie-title">
              <span className="label">Title: </span>
              <span className="value">{movie.title}</span>
            </div>
            <div className="movie-description">
              <span className="label">Description: </span>
              <span className="value">{movie.description}</span>
            </div>
            <div className="movie-director">
                  <span className="label">Director: </span>
                  <span className="value">{movie.director}</span>
                </div>
                <div className="movie-genre">
                  <span className="label">Genre: </span>
                  <span className="value">{movie.genre}</span>
            </div>
            <Link to={`/`}>
            <Button 
                //onClick={onBackClick} 
                className="back-button"
                style={{ cursor: "pointer" }}
                variant='primary'
                size='md'
            >Back
            </Button>
            </Link>
            <br />
            <br />
            <Button 
              className="button-add-favorite"
              onClick={addFavoriteMovie}
              disabled={movieExists}
            >
            + Add to Favorites
            </Button>
            <br/>
            <br/>
            <Button 
              variant="danger"
              onClick={removeFavoriteMovie}
              disabled={disableRemove}
            >
            Remove from Favorites
            </Button> 
          </div>
      </Col>
    </Row>
  );
};


/*MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    director: PropTypes.string
}).isRequired
};*/