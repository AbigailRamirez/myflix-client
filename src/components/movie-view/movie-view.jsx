import PropTypes from "prop-types";
import { Button, Card, Row, Col } from 'react-bootstrap';
import {useParams} from "react-router";
import {Link} from "react-router-dom";

import "./movie-view.scss";
import {MovieCard} from "../movie-card/movie-card";
import {useEffect, useState} from "react";



export const MovieView = ({ movies, user, token }) => {
  const {movieId} = useParams();
  const movie = movies.find(m => m._id === movieId);

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
}).isRequired
};