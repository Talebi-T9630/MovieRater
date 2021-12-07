import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Switch, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MovieReview from './movieReview';




// in this component 25 moives will be fetched
function Movies() {
  const [movies, setMovie] = useState([]);
  const [movieReviews, setMovieReviews] = useState([]);



  useEffect(async () => {
    axios.get("http://localhost:5000/moviesList")
      .then(resp => {
        console.log(resp, resp.data)
        setMovie(resp.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);


  return (
    <div style={{ backgroundColor: "#c4d4cb" }}>
      <h1 class="text-center"> Movies List</h1>
      <Row xs={1} md={2} className="g-4">
        {movies.map((movie, index) =>
          <Col>
            <Card key={movie._id} bg='dark' className="text-center" style={{ width: '18rem', alignItems: "center" }}>
              <Card.Body>
                <Card.Title style={{ color: "white" }}>({index + 1}) {movie.title}</Card.Title>
                <Card.Img src={movie.image} />
                <Card.Text style={{ marginBottom: 10, color: "white" }}>
                  {movie.crew}
                </Card.Text>

                <Link
                  to={{
                    pathname: "/movieReview",
                    state: [{ _id: movie._id, title: movie.title, image: movie.image }]
                  }}>
                  <Button variant="primary">
                    VIEW NOW
                  </Button></Link>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  )
}


export default Movies;