import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {Button, Form, Col, Row, InputGroup} from 'react-bootstrap';

function AddWine({handleAddWine}) {
    const navigate = useNavigate()
    const [bottle_name, setBottleName] = useState("")
    const [maker, setMaker] = useState("")
    const [region, setRegion] = useState("")
    const [vintage, setVintage] = useState("")
    const [profile, setProfile] = useState("")
    const [category, setCategory] = useState("")
    const [variety, setVariety] = useState("")
    const [price, setPrice] = useState("")
    const [image_url, setImage_url] = useState("")
    const [errors, setErrors] = useState([])

    async function handleSubmit(e) {
        e.preventDefault()
        const formattedPrice = parseFloat(price).toFixed(2);
        const response = await fetch("/wines",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                bottle_name: bottle_name,
                maker: maker,
                region: region,
                vintage: vintage,
                profile: profile,
                category: category,
                variety: variety,
                image_url: image_url,
                price: formattedPrice
             }),
        })
        const data = await response.json();
        if (response.ok) {
            handleAddWine(data)
            navigate("/wines")
            console.log("Wine Added To Database:", data);
        } else {
            console.log(data.errors)
            setErrors(data.errors);
        }
    }

    return (
        <div className="form_div">
            <h2>Add Wine To Database</h2>
            <br/>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                    <Form.Label>Wine Maker</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={maker}
                        onChange={(e) => setMaker(e.target.value)} 
                    />
                    </Form.Group>
                    <Form.Group as={Col}>
                    <Form.Label>Bottle Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={bottle_name}
                        onChange={(e) => setBottleName(e.target.value)}
                    />
                    </Form.Group>
                    <Form.Group as={Col}>
                    <Form.Label>Varietal</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={variety}
                        onChange={(e) => setVariety(e.target.value)}
                    />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                    <Form.Label>Region</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                    />
                    </Form.Group>
                    <Form.Group as={Col}>
                    <Form.Label>Vintage</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={vintage}
                        onChange={(e) => setVintage(e.target.value)}
                    />
                    </Form.Group>
                    <Form.Group as={Col}>
                    <Form.Label>Wine Type</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="red, white, rose ect." 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Label column xs={1}>Profile</Form.Label>
                    <Col>
                    <Form.Control 
                        type="text" 
                        placeholder="Flavour, notes, body, ABV, etc." 
                        value={profile} 
                        onChange={(e) => setProfile(e.target.value)}
                        />
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Form.Label column xs={1}>Image</Form.Label>
                    <Col>
                    <Form.Control 
                        type="text"     
                        placeholder="Image URL" 
                        value={image_url}
                        onChange={(e) => setImage_url(e.target.value)}
                    />
                    </Col>
                    <Form.Label column xs={1}>Price</Form.Label>
                    <Col>
                    <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">
                    $
                    </InputGroup.Text>
                    <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        type="text" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value) }
                    />
                    </InputGroup>
                    </Col>
                </Row>
                <br/>
                {errors.length > 0 && (
                    <ul style={{color: "red", listStylePosition: "inside"}}>
                    {errors.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                    </ul>
                )}
                <br/>
                <Button variant="outline-light" type="submit" style={{background: "#800022", borderBlockColor: "#800022", color: "FFFF"}}>Submit</Button>
            </Form>
        </div>
    )
}

export default AddWine;