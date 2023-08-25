import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Button} from 'react-bootstrap';
import CreateReview from "../components/CreateReview";
import Reviews from "./Reviews";

function WineCard({wines, setWines, user, setUser, handleAddReview, onEditReview, onDeleteReview}) {
    const {id} = useParams()
    const [toggleReviewForm, setToggleReviewForm] = useState(false)
    const [wine, setWine] = useState(null);
    const findWine = wines.find(w => w.id === parseInt(id))
    // const [wine, setWine] = useState({
    //     maker: "",
    //     bottle_name: "",
    //     region: "",
    //     vintage: "",
    //     variety: "",
    //     category: "",
    //     profile: "",
    //     image_url: "",
    //     rating: "",
    //     price: 0
    // })
    useEffect(()=> {
        if (findWine) {
            setWine(findWine)
        } else {
            console.log("nooooo!")
        }
    }, [wines, id, findWine])

    function handleAddReviewAndToggleForm(newReview) {
            handleAddReview(newReview); 
            setToggleReviewForm(false);
    }

    function handleDeleteReview(reviewId) {
        fetch(`/reviews/${reviewId}`, {
            method: "DELETE",
        })
        .then((r) => {
            if (r.ok) {
                onDeleteReview(reviewId); 
            }
        })
        .catch((error) => {
            console.error("Error deleting review:", error);
        });
    }

    console.log(wine)
    
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
                    wineId={wine.id} userId={user.id} 
                    hideForm={() => setToggleReviewForm(false)}
                    handleAddReview={handleAddReviewAndToggleForm}
                    // hideForm={() => setToggleReviewForm(false)} 
                    // handleAddReview={handleAddReview} 
                />
            )}
            <Reviews wine={wine} setWine={setWine} user={user} handleDeleteReview={handleDeleteReview} onEditReview={onEditReview} />
        </div>
    )
}
export default WineCard;