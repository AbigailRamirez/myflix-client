import "./movie-view.scss";
import PropTypes from "prop-types";
import { Button, Card, Row, Col } from 'react-bootstrap';


export const MovieView = ({ movie, onBackClick }) => {
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
            <Button 
                onClick={onBackClick} 
                className="back-button"
                style={{ cursor: "pointer" }}
                variant='secondary'
                size='md'
            >Back
            </Button>
          </div>
      </Col>
    </Row>
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