import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ReactComponent as Edit } from '../svg/edit.svg';



// in this component 25 moives will be fetched
function Movies() {
  const [movies, setMovie] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedId, setSelectedID] = useState(null);
  const [newReview, setNewReview] = useState([]);


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

  const handleChange = (e) => {
    const target = e.target;
    //console.log(e.target);



    if (target.id === "userFirstName") {

      var newrev = { ...newReview, userFistName: target.value };
      setNewReview(newrev);
    }


    if (target.id === "userLastName") {
      var newrev = { ...newReview, userLastName: target.value };
      setNewReview(newrev);
    }


    if (target.id === "userCommand") {
      var newrev = { ...newReview, userCommand: target.value };
      setNewReview(newrev);
    }


    if (target.id === "userRate") {
      var newrev = { ...newReview, userRate: target.value };
      setNewReview(newrev);
    }



    console.log(newReview);

  }
  const handleSelectedId = (id) => {
    setSelectedID(id);
    var movieref = id.moiveRef;
    axios.get(`http://localhost:5000/allMoiveReviews/show`)
      .then(resp => {
        console.log(resp, resp.data);
        var filteredReviews = resp.data.filter(c => c.moiveRef == movieref);
        setReviews(filteredReviews);
      })
      .catch(err => {
        console.log(err);
      })
  }

  //add 
  const handleAdd = async (id) => {
    console.log(id);
    const { data } = await axios.post(`http://localhost:5000/spicificMoiveReview/submitNew/movie/${id.moiveRef}`, newReview);
    console.log(data);
    if (typeof data === 'object') {
      const review = data;
      console.log(review);
      const newReview = [...reviews, review];
      setReviews([...newReview]);
      document.getElementById("userFirstName").value = "";
      document.getElementById("userLastName").value = "";
      document.getElementById("userCommand").value = "";
      document.getElementById("userRate").value = "";
    }
    else {
      console.log("Can not add object");
    }
  }

  //update 
  const handleUpdate = async (review) => {
    console.log("Update Handled");
    console.log(review);
    review.userFistName = "Anu";
    review.userLastName = "Gupta";
    review.userCommand = "I love this movie";
    review.userRate = 5;
    const { data } = await axios.put(`http://localhost:5000/spicificMoiveReview/update/${review._id}/movie/${review.moiveRef}`, review);
    const index = reviews.indexOf(data);
    reviews[index] = { ...review };
    console.log(reviews);
    setReviews([...reviews]);
  }

  //Delete
  const handleDelete = async (review) => {
    console.log("Delete handled");
    const { data } = await axios.get(`http://localhost:5000/spicificMoiveReview/delete/${review._id}/movie/${review.moiveRef}`);
    const newReviews = reviews.filter(s => s._id !== review._id);

    console.log(data, newReviews);
    setReviews([...newReviews]);
  }






  return (
    !selectedId ?
      (<div style={{ backgroundColor: "#c4d4cb" }}>
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
                  <Button variant="primary" onClick={() => handleSelectedId(movie)}>
                    VIEW NOW
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </div>)
      :
      (
        <div style={{ backgroundColor: "#c4d4cb" }}>
          <Card bg='dark' className="text-center" style={{ width: '18rem', alignItems: "center", color: "white" }}>
            <Card.Img src={selectedId.image} />
            <Card.Title>{selectedId.title}</Card.Title>
            <Card.Body>
              <Card.Text>
                {selectedId.crew}
                {selectedId.imDbRating}
              </Card.Text>
            </Card.Body>
          </Card>
          <br></br>
          <br></br>

          <form>
            <label htmlFor="userFirstName">First Name:</label>
            <input type="text"
              name="userFirstName"
              id="userFirstName"
              className="form-control w-25 p-3"
              onChange={handleChange}>
            </input>
            <label htmlFor="userLastName">Last Name:</label>
            <input type="text"
              name="userLastName"
              id="userLastName"
              className="form-control w-25 p-3"
              onChange={handleChange}>
            </input>
            <label htmlFor="userLastName">Comment: </label>
            <input type="text"
              name="userCommand"
              id="userCommand"
              className="form-control w-25 p-3"
              onChange={handleChange}>
            </input>
            <label htmlFor="userLastName">Rate:</label>
            <input type="number"
              name="userRate"
              id="userRate"
              className="form-control w-25 p-3"
              onChange={handleChange}>
            </input>
            <button type="button" onClick={() => handleAdd(selectedId)} className="btn btn-primary m-2">SUBMIT</button>
          </form>


          <table className="table table-striped " style={{ width: 1500 }}>
            <thead>
              <th><h3>Comments</h3> </th>
            </thead>

            {reviews.map(review =>
              <tbody key={review.moiveRef}>
                <tr>{review.userFistName} {review.userLastName}</tr>
                <tr> {review.userCommand}</tr>
                <tr>Rate: {review.userRate}</tr>
                <tr><button className="deleteButton"
                  onClick={() => { if (window.confirm(`Delete the comment by ${review.userFistName} ${review.userLastName}?`)) { handleDelete(review) }; }} style={{ margin: 20, backgroundColor: "none", border: "none", color: "black" }}>X</button>
                   <button className="editButton" onClick={() => handleUpdate(review)} style={{ backgroundColor: "none", border: "none" }}><Edit style={{ width: 20, height: 20, backgroundColor: "none" }}></Edit></button>
                </tr>

              </tbody>)}

          </table>
        </div>
      )

  )
}


export default Movies;