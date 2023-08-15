import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Button} from 'react-bootstrap';
import CreateReview from "../components/CreateReview";
import Reviews from "../components/Reviews";

function WineCard({wines, setWines, user, setUser}) {
    const {id} = useParams()
    const [toggleReviewForm, setToggleReviewForm] = useState(false)
    const [wine, setWine] = useState({
        maker: "",
        bottle_name: "",
        region: "",
        vintage: "",
        variety: "",
        category: "",
        profile: "",
        image_url: "",
        rating: "",
        price: 0
    })
    const findWine = wines.find(w => w.id === parseInt(id))
    useEffect(()=> {
        if (findWine) {
            setWine(findWine)
        } else {
            console.log("nooooo!")
        }
    }, [wines, id, findWine])

    function handleDelete(e) {
        // fetch(`/reviews/${id}`, {
        //     method: "DELETE"
        // })
        // .then(r => {

        // })
    }
    function handleUpdateWine() {

    }
    
    return (
        <div className="wine_card">
            <div className="card mb-3" style={{height: "auto"}} >
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
                                >Leave a Review</Button>
                            </p>
                            <Button 
                                onClick={handleUpdateWine}
                                style={{backgroundColor:"#E8E67B"}} 
                                >Edit
                            </Button>
                            <Button 
                                onClick={handleDelete}
                                style={{backgroundColor:"#FF8B76"}} 
                                >Delete
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {toggleReviewForm && (<CreateReview wine={wine} user={user} setUser={setUser} wineId={wine.id} userId={user.id} hideForm={() => setToggleReviewForm(false)} />)}
            <Reviews wine={wine} user={user} />
        </div>
    )
}
export default WineCard;