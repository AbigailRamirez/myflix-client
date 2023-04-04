import "./movie-view.scss";
import PropTypes from "prop-types";
import Col from 'react-bootstrap/Col';

export const MovieView = ({ movie, onBackClick }) => {
    return (
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
        <button 
          onClick={onBackClick} 
          className="back-button"
          style={{ cursor: "pointer" }}
        >
        Back
        </button>
      </div>
    );
};


MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    director: PropTypes.string
}).isRequired,
  onBackClick: PropTypes.func.isRequired
};