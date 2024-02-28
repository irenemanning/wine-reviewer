import React from "react"
import Spinner from 'react-bootstrap/Spinner'

function Loading() {
    return (
        <div className="loading">
            <Spinner animation="border" role="status"></Spinner>  
        </div>
        
    )
}

export default Loading