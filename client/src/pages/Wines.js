import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Card, Col, Row } from "react-bootstrap";

function Wines({wines}) {
    const navigate = useNavigate()
    const [before2000, setBefore2000] = useState([])

    function handleClick2000(){
        fetch("/winebefore2000")
        .then((r) => r.json())
        .then((data)=> {
            setBefore2000(data)
            console.log(data)
        })
    }
    
    return (
        <div className="wines_container">
            <button onClick={handleClick2000}>find wines before 2000</button>
            
                {before2000.map((w)=> (
                    <div>
                        {w.bottle_name} - {w.vintage}
                    </div>
                ))}
            
            <Row xs={1} md={2} className="g-4">
            {wines.map((wine) => (
                <Col 
                    key={wine.id}
                    onClick={()=>navigate(`/wines/${wine.id}`)} 
                    className="wine_card" 
                    style={{ width: '18rem'}}
                    >
                <Card style={{maxHeight: '23rem'}}>
                    <Card.Img 
                        variant="top" 
                        height={200}
                        width={200}
                        src={wine.image_url} />
                    <Card.Body>
                        <Card.Title>{wine.maker} - {wine.bottle_name}</Card.Title>
                        <Card.Text>{wine.region}, {wine.vintage}</Card.Text>
                        <Card.Title>${parseFloat(wine.price).toFixed(2)}</Card.Title>
                    </Card.Body>
                </Card>
                </Col>
            ))}
            </Row>
        </div>
    )
}

export default Wines;