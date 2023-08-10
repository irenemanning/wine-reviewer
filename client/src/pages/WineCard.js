import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

function WineCard({wines, setWines, user, setUser}) {
    const {id} = useParams()
    const [wine, setWine] = useState({})
    const findWine = wines.find(w => w.id === parseInt(id))
    useEffect(()=> {
        setWine(findWine)
    })
    // console.log(wine)
    
    return (
        <div>
            <div className="card mb-3" style={{height: "auto", margin: "16%"}} >
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
                        <p className="card-text">${wine.price}</p>
                        <p className="card-text">Rating / 5</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" height={250} src={wine.image_url} />
            <Card.Body>
        <Card.Title>Title Text</Card.Title>
        <Card.Text>
          Here's some fillllllller text
        </Card.Text>
        <div className="d-flex justify-content-between">
          <Button className="ms-3">Add</Button>
          <Button className="me-3">Remove</Button>
        </div>
      </Card.Body>
            </Card> */}
        </div>
    )
}
export default WineCard;