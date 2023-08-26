import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {Button} from 'react-bootstrap';
import CreateReview from "../components/CreateReview";
import Reviews from "./Reviews";

function WineCard({wines, setWines, user, setUser}) {
    const {id} = useParams()
    const [toggleReviewForm, setToggleReviewForm] = useState(false)
    const wine = wines.find(w => w.id === parseInt(id))

    function handleAddReview(newReview) {
        newReview.username = user.username
        const updatedWine = {
          ...wine,
          reviews: [...wine.reviews, newReview],
        }
        const updatedUser = {
          ...user,
          wines: [...user.wines, updatedWine],
        }
        const updatedWines = wines.map((w) => (w.id === wine.id ? updatedWine : w))
        setWines(updatedWines);
        setUser(updatedUser);
    }

    function handleEditReview(editedReview) {
        const updatedReviews = wine.reviews.map((review) =>
            review.id === editedReview.id ? editedReview : review
        )
        editedReview.username = wine.reviews.find((r) => r.id === editedReview.id).username;

        const updatedWines = wines.map((w) =>
            w.id === wine.id ? { ...wine, reviews: updatedReviews } : w
        );
        setWines(updatedWines)
    }

    function handleDeleteReview(reviewId) {
        const updatedWine = {
          ...wine,
          reviews: wine.reviews.filter((review) => review.id !== reviewId),
        }
        const updatedUser = {
          ...user,
          wines: user.wines.filter((userWine) => userWine.id !== wine.id),
        }
        const updatedWines = wines.map((w) =>
          w.id === wine.id ? updatedWine : w
        )
        setWines(updatedWines)
        setUser(updatedUser)
    }

    function onDeleteReview(reviewId) {
        fetch(`/reviews/${reviewId}`, {
            method: "DELETE",
        })
        .then((r) => {
            if (r.ok) {
                handleDeleteReview(reviewId)
            }
        })
        .catch((error) => {
            console.error("Error deleting review:", error)
        });
    }
    
    return (
        <div className="wine_card">
            <div className="card mb-3" style={{height: "auto"}} >
                {wine && (
                <div className="row g-0"  width={100}>
                    <div className="col-md-4" width={100}>
                        <img src={wine.image_url} className="img-fluid rounded-start" alt="..." style={{maxHeight: "25rems"}}/>
                    </div>
                    <div className="col-md-8">
                            <div className="card-body">
                            <h4 className="card-title">{wine.maker} - {wine.bottle_name}</h4>
                            <p className="card-text">{wine.variety}, {wine.vintage}</p>
                            <p className="card-text">Region: {wine.region}</p>
                            <p className="card-text"><small>Category: {wine.category}</small></p>
                            <p className="card-text">{wine.profile}</p>
                            <p className="card-text">${parseFloat(wine.price).toFixed(2)}</p>
                            <p className="card-text">Rating / 5
                            <Button 
                                variant="outline-secondary" size="sm" style={{margin: "15px"}} 
                                onClick={()=>setToggleReviewForm(true)}
                                >Leave a Review
                            </Button>
                            </p>
                        </div>
                    </div>
                </div>
                )}
            </div>
            {toggleReviewForm && (
                <CreateReview 
                    wine={wine} 
                    user={user} 
                    setUser={setUser}
                    setToggleReviewForm={setToggleReviewForm}
                    handleAddReview={handleAddReview}
                />
            )}
            <Reviews wine={wine} user={user} onDeleteReview={onDeleteReview} handleEditReview={handleEditReview} />
        </div>
    )
}

export default WineCard;