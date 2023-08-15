import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

function Reviews({wine, user}) {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        if (wine && wine.reviews) {
          setReviews(wine.reviews);
        }
    }, [wine]);
    return (
        <div>
            {reviews.map((review) => (
                <Card key={review.id} style={{ width: 'auto', display: 'flex', margin: "20px"}}>
                <Card.Body>
                    <Card.Title>{wine.maker} - {wine.bottle_name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{review.rating} / 5</Card.Subtitle>
                    <Card.Text>{review.opinion}</Card.Text>
                    <small className="text-muted">Review by {review.username}</small>
                </Card.Body>
                </Card>
            ))}
            
        </div>
    )
}

export default Reviews;