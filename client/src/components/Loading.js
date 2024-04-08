import React from "react"
import {Spinner, Card} from 'react-bootstrap'

function Loading() {
    return (
    
        <Card className="loading-card">
            <h3 className="loading-text">Loading...</h3>
            <Spinner animation="border" role="status"></Spinner>   
        </Card>
        
    )
}

export default Loading