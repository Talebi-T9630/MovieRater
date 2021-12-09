import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Switch, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AddNewComment from './addnewcomment';
import {ReactComponent as Edit} from '../svg/edit.svg';




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

  const handleAdd = async (id) => {
    setSelectedID(id);
    console.log(newReview);
    let movieRef = id.moiveRef;
    const { data } = axios.post(`http://localhost:5000/spicificMoiveReview/submitNew/movie/`, movieRef);
    console.log(data);
    if (typeof data === 'object') {
      const review = data;
      console.log(review);
      const newReview = [...reviews, review];
      setReviews([...newReview]);
    }
    else {
      console.log("Can not add object");
    }
  }
  // const handleUpdate = async (student)=>{
  //   console.log("Update Handled");
 
  //   student.first_name = "Mary";
  //   student.last_name = "Jos"
  //   student.age=21;
  //   const {data} = await axios.put("http://localhost:5000/api/StudentInfo/"+student._id);
  //   const index = students.indexOf(student);
  //   students[index] = {...student};
  //   console.log(students);
  //   setStudents([...students]);
  //  }

  const handleDelete = async (review)=>{
    console.log("Delete handled");
    const {data} = await axios.get(`http://localhost:5000/spicificMoiveReview/delete/${review._id}/movie/${review.moiveRef}`);
    const newReviews = reviews.filter(s=>s._id !== review._id);
    
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

          <Link to={{ pathname: "/addnewcomment" }}><button className="btn btn-success float-right" onClick={() => handleAdd(selectedId.moiveRef)} >+New Comment</button></Link>
        
          <table className="table table-striped " style={{ width: 1500 }}>
            <thead>
              <th><h3>Comments</h3> </th>
            </thead>

            {reviews.map(review =>
              <tbody key={review.moiveRef}>
                <tr>{review.userFistName} {review.userLastName}</tr>
                <tr> {review.userCommand}</tr>
                <tr>Rate: {review.userRate}</tr>
                <tr><button className="deleteButton" onClick={()=>{if(window.confirm(`Delete the comment by ${review.userFistName} ${review.userLastName}?`)){handleDelete(review)};}} style={{margin:20, backgroundColor:"none", border:"none", color:"black"}}>X</button><button className="editButton" style={{backgroundColor:"none", border:"none"}}><Edit style={{width:20, height:20}}></Edit></button></tr>
              </tbody>)}

          </table>
        </div>
      )

  )
}


export default Movies;