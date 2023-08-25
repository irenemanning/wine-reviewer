import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import EditReview from "../components/EditReview";

function Reviews({wine, setWine, user, handleDeleteReview, onEditReview}) {
    const [reviews, setReviews] = useState([])
    const [toggleEditForm, setToggleEditForm] = useState(false)
    useEffect(() => {
        if (wine && wine.reviews) {
          setReviews(wine.reviews);
        }
    }, [wine]);

    function onEditReview(editedReview) {
        const updatedReviews = reviews.map(review =>
            review.id === editedReview.id ? editedReview : review
        );
        setReviews(updatedReviews);
    }

    return (
        <div>
            {reviews.map((review) => (
                <Card key={review.id} style={{ width: 'auto', display: 'flex', margin: "20px"}}>
                <Card.Body>
                    <Card.Title>{wine.maker} - {wine.bottle_name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{review.rating} / 5</Card.Subtitle>
                    <Card.Text>{review.opinion}</Card.Text>
                    <small className="text-muted">Review by {review.username}</small>
                    <br/>
                    {review.user_id === user.id && (
                        <>
                            <Button 
                                className="mb-2" 
                                size="sm"
                                variant="secondary"
                                onClick={()=>setToggleEditForm(true)}
                                // style={{backgroundColor:"#E8E67B"}}
                                >Edit
                            </Button>
                            <Button
                                className="mb-2" 
                                size="sm" 
                                variant="secondary"
                                onClick={() => handleDeleteReview(review.id)}
                                >Delete
                            </Button>
                        </>
                    )}
                {toggleEditForm && (
                    <EditReview review={review} setReviews={setReviews} wine={wine} onEditReview={onEditReview}  setToggleEditForm={setToggleEditForm} />
                )}
                </Card.Body>
                </Card>
            ))}
            
        </div>
    )
}

export default Reviews;