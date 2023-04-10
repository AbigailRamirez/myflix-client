import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import {ProfileView} from "../profile-view/profile-view";
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
    //const [selectedMovie, setSelectedMovie] = useState(null);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
  

    const updateUser = user => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    }
    
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
        localStorage.setItem("movies", JSON.stringify(moviesFromApi))
        });
    }, [token]);

    return(
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
            />
            <Row className="justify-content-md-center">
                <Routes>

                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/"/>
                                ): (
                                    <Col md={5}>
                                        <SignupView/>
                                    </Col>
                                )}
                            </>
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/"/>
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user) => {
                                            setUser(user);
                                            setToken(token);
                                            }} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            !user ? (
                                <Navigate to="/login" replace />
                            ) : (
                                <ProfileView user={user} token={token} movies={movies} onLoggedOut={() => {
                                    setUser(null);
                                    setToken(null);
                                    localStorage.clear();
                                    }} updateUser={updateUser}/>
                                )
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col md={8}>
                                        <MovieView movies={movies} />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>
                                        {movies.map((movie) => (
                                            <Col className="mb-4" key={movie.id} md={3}>
                                                <MovieCard movie={movie}/>
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />

                    {/*{!user ? (
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
                    )}*/}
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
  
