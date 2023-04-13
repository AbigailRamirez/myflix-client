import PropTypes from "prop-types";
import { Row, Button, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { MovieCard } from "../movie-card/movie-card";
import { MainView } from "../main-view/main-view";
import { useEffect, useState } from "react";

export const MovieView = ({ movies, user, token, updateUser }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  const [isFavorite, setIsFavorite] = useState(
    user.FavoriteMovies.includes(movie.id)
  );

  useEffect(() => {
    setIsFavorite(user.FavoriteMovies.includes(movie.id));
    window.scrollTo(0, 0);
  }, [movieId]);

  const addFavorite = () => {
    fetch(
      `https://filmeo-app.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("Successfully added to favorites");
          setIsFavorite(true);
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  const removeFavorite = () => {
    fetch(
      `https://filmeo-app.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert("Successfully deleted from favorites");
          setIsFavorite(false);
          updateUser(user);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

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
              className="back-button"
              style={{ cursor: "pointer" }}
              variant="primary"
              size="md"
            >
              Back
            </Button>
          </Link>
          {isFavorite ? (
            <Button
              variant="danger"
              className="back-button ms-2"
              onClick={removeFavorite}
            >
              Remove from favorites
            </Button>
          ) : (
            <Button className="back-button ms-2" onClick={addFavorite}>
              Add to favorites
            </Button>
          )}
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
