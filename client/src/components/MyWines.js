import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
function MyWines(user) {
    const [reviews, setReviews] = useState([])
    const [wines, setWines] = useState([])
    useEffect(() => {
        if (user && user.user.reviews && user.user.wines) {
          setReviews(user.user.reviews);
          setWines(user.user.wines)
        }
    }, [user]);
    // console.log(wines)
    return (
        <div>
            <h2>My Wines & Reviews</h2>
            {wines.map((wine) => (
                
            ))}
            {/* {reviews.map((review) => (
                <Card key={review.id} style={{ width: 'auto', display: 'flex', margin: "20px"}}>
                <Card.Body>
                    <Card.Title>{wine.maker} - {wine.bottle_name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{review.rating} / 5</Card.Subtitle>
                    <Card.Text>{review.opinion}</Card.Text>
                    <small className="text-muted">Review by {review.username}</small>
                </Card.Body>
                </Card>
            ))} */}
        </div>
    )
}

export default MyWines;