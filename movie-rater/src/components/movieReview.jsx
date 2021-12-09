import React from 'react';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import {  Link } from 'react-router-dom';
import axios from 'axios';


function MovieReview(props) {
    const [reviews, setReviews] = useState([]);
    const [newComment, setNewComments] = useState([]);
    const index = 0;

    useEffect(async () => {
        axios.get(`http://localhost:5000/allMoiveReviews/show`)
            .then(resp => {
                console.log(resp, resp.data)
                setReviews(resp.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const handleAdd = async()=>{
        console.log(newComment);
        const {data} = await axios.post("/spicificMoiveReview/submitNew/movie/", newComment);
        console.log(data);
        if(typeof data === 'object'){
          const movie = data;
          console.log(movie);
          const newComments = [...reviews, movie];
          setReviews([...newComments]);
        }
        else{
          console.log("Can not add object");
        }
      }
   
   


    return (
        <>

            <Card>
                <Card.Img variant="top" src={"holder.js/100px180"} />
                <Card.Body>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk
                        of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <br></br>
            <br></br>

            <Link to={{pathname: "/addnewcomment"}}>   <button className="btn btn-success float-right" onClick={handleAdd}>+New Comment</button></Link>
            <table className="table table-striped " style={{ width: 1500 }}>
                <thead>
                    <th><h3>Comments</h3> </th>
                </thead>

                {reviews.map(review =>
                    <tbody key={review.moiveRef}>
                        <tr>{review.userFistName} {review.userLastName}</tr>
                        <tr> {review.userCommand}</tr>
                        <tr>Rate: {review.userRate}</tr>
                    </tbody>)}

            </table>
        </>
    )
}
export default MovieReview;