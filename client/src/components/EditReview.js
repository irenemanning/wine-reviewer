import React, { useState } from "react";
import { Button, Form, CloseButton } from "react-bootstrap";

function EditReview({ review, wine, handleEditReview, toggleEditForm }) {
    const [updatedReview, setUpdatedReview] = useState({
        rating: review.rating,
        review: review.review,
    });
    const [errors, setErrors] = useState([])
    async function onEditReview(e) {
        e.preventDefault();
        const response = await fetch(`/reviews/${parseInt(review.id)}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                rating: parseInt(updatedReview.rating), 
                review: updatedReview.review, 
                user: {
                    username: review.username
                }
            }), 
        })
        const data = await response.json()
        if (response.ok) {
            setUpdatedReview(data); 
            handleEditReview(data);
            toggleEditForm(); 
        } else {
            setErrors(data.errors);
        }
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setUpdatedReview((prevUpdatedReview) => ({
            ...prevUpdatedReview,
            [name]: value,
        }));
    }

    return (
        <div>
            <Form className="form_div" onSubmit={onEditReview}>
                <Form.Group className="mb-3" style={{ paddingBottom: "20px" }}>
                    <h4 style={{ float: "left" }}>Edit Review of {wine.maker}-{wine.bottle_name}</h4>
                    <CloseButton onClick={()=>toggleEditForm()} style={{ float: "right" }} />
                </Form.Group>
                <br />
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
                    name="review"
                    value={updatedReview.review}
                    onChange={handleInputChange}
                    />
                </Form.Group>
                {errors.length > 0 && (
                    <ul style={{color: "red", listStylePosition: "inside"}}>
                    {errors.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                    </ul>
                )}
                <Button variant="primary" type="submit">Submit</Button> 
            </Form>
        </div>
    );
}

export default EditReview;