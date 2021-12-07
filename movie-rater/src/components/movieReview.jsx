import React from 'react';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import axios from 'axios';


function MovieReview(props) {
    const [reviews, setReviews] = useState([]);
    const index = 0;

    useEffect(async () => {
        axios.get("http://localhost:5000/allMoiveReviews/show")
            .then(resp => {
                console.log(resp, resp.data)
                setReviews(resp.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);



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

            <button className="btn btn-success float-right">+New Comment</button>
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