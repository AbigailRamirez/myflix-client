import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
    return (
      //Need to update with actors and genre
      <div>
        <div>
          <img src={movie.image} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.director}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.description}</span>
        </div>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };


  MovieView.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.string,
        director: PropTypes.string,
        description: PropTypes.string

    }).isRequired,
    onBackClick: PropTypes.func.isRequired
  };