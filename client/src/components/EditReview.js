import React, { useState } from "react";
import { Button, Form, CloseButton } from "react-bootstrap";

function EditReview({ review, setReviews, wine, onEditReview, setToggleEditForm }) {
    const [updatedReview, setUpdatedReview] = useState({
        rating: review.rating,
        opinion: review.opinion,
    });

    function handleUpdateReview(e) {
        e.preventDefault();
        fetch(`/reviews/${parseInt(review.id)}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ review: updatedReview }), // Use the updatedReview state
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((editedReview) => {
                    updateReview(editedReview);
                    setToggleEditForm(false);
                });
            }
        })
        .catch((error) => {
            console.error("Error updating review:", error);
        });
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setUpdatedReview((prevUpdatedReview) => ({
            ...prevUpdatedReview,
            [name]: value,
        }));
    }

    function updateReview(updatedReview) {
        onEditReview(updatedReview);
        setReviews((prevReviews) =>
            prevReviews.map((prevReview) =>
                prevReview.id === updatedReview.id ? updatedReview : prevReview
            )
        );
    }

    return (
        <div>
            <Form className="form_div" onSubmit={handleUpdateReview}>
                {/* ... other form elements ... */}
                <Form.Group className="mb-3">
                    <Form.Label style={{float: "left"}}>Rating</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Rating out of 5"
                    name="rating"
                    value={updatedReview.rating}
                    onChange={handleInputChange} 
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label style={{float: "left"}}>Review</Form.Label>
                    <Form.Control 
                    as="textarea" 
                    rows={3} 
                    name="opinion"
                    value={updatedReview.opinion}
                    onChange={handleInputChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button> 
            </Form>
        </div>
    );
}

export default EditReview;