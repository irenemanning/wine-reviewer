import React from "react"
import { useNavigate } from 'react-router-dom'
import { Card, Col, Row } from "react-bootstrap"

function Wines({wines}) {
    const navigate = useNavigate()
    
    return (
        <div className="wines_container">  
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

export default Wines