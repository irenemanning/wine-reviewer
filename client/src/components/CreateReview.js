import React, { useState } from "react";
import {Form, Button, CloseButton} from 'react-bootstrap';


function CreateReview({wine, user, setUser, wineId, userId, hideForm}) {
    const [rating, setRating] = useState(0)
    const [opinion, setOpinion] = useState("")
    const [userWines, setUserWines] = useState(user.wines)
    const [errors, setErrors] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        const ratingInt = parseInt(rating);
        const reviewData = {
            user_id: userId,
            wine_id: wineId,
            rating: ratingInt,
            opinion: opinion
        };
        console.log(reviewData)
        fetch("/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reviewData),
        })
        .then((r) => {
            if (r.ok) {
              r.json().then((updatedWine) => {
                setRating(0);
                setOpinion("")
                setErrors([]);
                setUser({...user, wines: [...userWines, updatedWine]})
                hideForm()
              });
            } else {
              r.json().then((err) => setErrors(err.errors));
            }
        });
    }
    return (
        <div>
            <Form className="form_div" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" style={{paddingBottom: "20px"}}>
                    <h4 style={{float: "left"}}>Review of {wine.maker}-{wine.bottle_name}</h4>
                    <CloseButton onClick={()=>hideForm()} style={{float: "right"}}/>
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
                    onChange={(e) => setOpinion(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button> 
            </Form>
        </div>
    )
}

export default CreateReview;