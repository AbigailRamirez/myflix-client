import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Button from "react-bootstrap/Button";
import {
    Button,
    Form,
    Card,
    CardGroup,
    Container,
    Col,
    Row,
} from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";




export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
  
    useEffect(() => {
        if (!token) {
        return;
        }
        
        fetch("https://filmeo-app.herokuapp.com/movies", {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('data', data);
        const moviesFromApi = data.map((movie) => {
            return {
            // value names match to API database
            id: movie._id,
            title: movie.Title,
            image: movie.ImagePath,
            description: movie.Description,
            genre: movie.Genre.Name,
            director: movie.Director.Name,
            }
        });
        setMovies(moviesFromApi);
        })
    }, [token]);

    return(
        <Row className="justify-content-md-center">
            {!user ? (
                <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {setUser(user); setToken(token);}} />
                    <div className="text-center"> or </div>
                    <SignupView />
                </Col>
            ) : selectedMovie ? (
                <Col md={8} >
                    <Button
                        onClick={() => {
                            setUser(null); setToken(null); localStorage.clear()
                        }}
                        className='mb-3'
                    >
                        Logout  
                    </Button>
                    <MovieView
                        movie={selectedMovie}
                        onBackClick={() => setSelectedMovie(null)}
                    />
                </Col>
            ) : movies.length === 0 ? (
                <div>The List is empty!</div>
            ) : (
                <>
                    <Row>
                        <Col>
                            <Button
                                onClick={() => {
                                setUser(null); setToken(null); localStorage.clear()
                                }}
                                className='mb-3'
                            >
                            Logout
                            </Button>
                        </Col>
                    </Row>
                
                    {movies.map((movie) => (
                        <Col className="mb-5" key={movie.id} md={3}>
                        <MovieCard
                            movie={movie}
                            onMovieClick={(newSelectedMovie) => {
                                setSelectedMovie(newSelectedMovie);
                            }}
                        />
                        </Col>
                    ))}
                </>
            )}
        </Row>
    );
};
  
