import React from "react";
import { Card } from "react-bootstrap";
import MyWines from "../components/MyWines";

function Profile({user}) {
    return (
        <div className="mt-5">
            <Card className="mt-5" style={{ maxWidth: '400px' }}>
            {user.profile_image === null ? (
                <Card.Img 
                variant="top" 
                src="/Default_Avatar.png" 
                style={{
                    position: "flex",
                    margin: "auto",
                    padding: "20px",
                    height: "200px", 
                    width: "200px",
                    aspectRatio: 1
                }} 
                />
            ) : (
                <Card.Img 
                variant="top" 
                src={user.profile_image} 
                style={{
                    position: "flex",
                    margin: "auto",
                    padding: "20px",
                    height: "200px", 
                    width: "200px",
                    aspectRatio: 1
                }} 
                />
            )}
                <Card.Body>
                <Card.Title>Hello, {user.username}</Card.Title>
                </Card.Body>
                <Card.Footer>
                <small className="text-muted">Update Profile Picture</small>
                </Card.Footer>
            </Card>
            <MyWines user={user} />
        </div>  
    )
}

export default Profile;