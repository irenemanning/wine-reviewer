import React from "react"
import {Spinner, Card} from 'react-bootstrap'

function Loading() {
    return (
        <div className="loading">
            <Card className="loading-card">
                <h3>Loading...</h3>
                <Spinner animation="border" role="status"></Spinner>   
            </Card>
        </div>
    )
}

export default Loading