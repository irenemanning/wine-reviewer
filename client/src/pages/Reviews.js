import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import EditReview from "../components/EditReview";

function Reviews({wine, user, handleEditReview, onDeleteReview}) {
    const [showForm, setShowForm] = useState({})
    function toggleEditForm (reviewId) {
        setShowForm((prevEditFormStates) => ({
          ...prevEditFormStates,
          [reviewId]: !prevEditFormStates[reviewId]
        }));
      }

    if (!wine) {
        return <div>Loading reviews...</div>
    }
    
    return (
        <div>
            {wine.reviews.map((review) => (
                <Card key={review.id} style={{ width: 'auto', display: 'flex', margin: "20px"}}>
                <Card.Body>
                    <Card.Title>{wine.maker} - {wine.bottle_name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{review.rating} / 5</Card.Subtitle>
                    <Card.Text>{review.review}</Card.Text>
                    <small className="text-muted">Review by {review.username}</small>
                    <br/>
                    {review.user_id === user.id && (
                        <>
                            <Button 
                                className="mb-2" 
                                size="sm"
                                variant="secondary"
                                onClick={() => toggleEditForm(review.id)}
                                style={{backgroundColor:"#FD95AE"}}
                                >Edit
                            </Button>
                            <Button
                                className="mb-2" 
                                size="sm" 
                                variant="secondary"
                                onClick={() => onDeleteReview(review.id)}
                                >Delete
                            </Button>
                        </>
                    )}
                {showForm[review.id] && (
                    <EditReview 
                        review={review}     
                        wine={wine} handleEditReview={handleEditReview}  
                        toggleEditForm={() => toggleEditForm(review.id)} 
                    />
                )}
                </Card.Body>
                </Card>
            ))}
            
        </div>
    )
}

export default Reviews;