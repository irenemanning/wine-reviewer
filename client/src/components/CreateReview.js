import React, { useState } from "react";
import {Form, Button, CloseButton} from 'react-bootstrap';
import { useParams } from "react-router-dom";

function CreateReview({wine, user, setToggleReviewForm, handleAddReview}) {
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState("")
    const [errors, setErrors] = useState([]);
    const { id } = useParams()

    async function handleSubmit(e) {
        e.preventDefault();
        const addedReview = {
            rating: parseInt(rating), 
            review: review, 
            wine_id: id
        }
        const response = await fetch("/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(addedReview),
        })
        const data = await response.json()
        if (response.ok) {
            setToggleReviewForm(false)
            handleAddReview(data)
        } else {
            if (data.errors && Array.isArray(data.errors)) {
                setErrors(data.errors);
            } else {
                console.log("Invalid error response:", data);
            }
        }   
    }
    return (
        <div>
            <Form className="form_div" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" style={{paddingBottom: "20px"}}>
                    <h4 style={{float: "left"}}>Review of {wine.maker}-{wine.bottle_name}</h4>
                    <CloseButton onClick={()=>setToggleReviewForm(false)} style={{float: "right"}}/>
                </Form.Group>
                <br/>
                <Form.Group className="mb-3">
                    <Form.Label style={{float: "left"}}>Rating</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Rating out of 5"
                    onChange={(e) => setRating(e.target.value)} 
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label style={{float: "left"}}>Review</Form.Label>
                    <Form.Control 
                    as="textarea" 
                    rows={3} 
                    onChange={(e) => setReview(e.target.value)}
                    />
                </Form.Group>
                {errors.length > 0 && (
                    <ul style={{color: "red", listStylePosition: "inside"}}>
                    {errors.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                    </ul>
                )}
                <Button variant="outline-light" type="submit" style={{background: "#800022"}} >Submit</Button> 
            </Form>
        </div>
    )
}

export default CreateReview;