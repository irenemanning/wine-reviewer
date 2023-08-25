import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";


function MyWines({user, wines, setWines}) {
    const [userWines, setUserWines] = useState([]);

    useEffect(() => {
        if (user && user.reviews && user.wines) {
          const combined = user.wines.map((wine) => {
            const matchingReview = user.reviews.find(
              (review) => review.wine_id === wine.id
            );
    
            return {
              ...wine,
              review: matchingReview
            };
          });
          setUserWines(combined);
        }
      }, [user, user.wines, user.reviews]);

    return (
        <div>
            <h2>My Wines</h2>
            {userWines.map((item) => (
                <Card key={item.id} style={{ width: "auto", display: "flex", margin: "20px" }}>
                    <Card.Img 
                        variant="top" 
                        height={200}
                        width={200}
                        src={item.image_url} />
                    <Card.Body>
                        <Card.Title>{item.maker} - {item.bottle_name}, {item.vintage}</Card.Title>
                        <Card.Text>Region: {item.region}</Card.Text>
                        <Card.Text>{item.profile}</Card.Text>
                        <Card.Text>Variety: {item.variety}</Card.Text>
                        <Card.Text>Category: {item.category}</Card.Text>
                        <Card.Title>${parseFloat(item.price).toFixed(2)}</Card.Title>
                    </Card.Body>
                </Card>
            ))}
        </div>
    )
}

export default MyWines;