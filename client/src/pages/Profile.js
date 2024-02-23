import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import MyWines from "../components/MyWines";

function Profile({user}) {
    const [profileImage, setProfileImage] = useState(user.profile_image)
    const [PopUpForm, setPopUpForm] = useState(false)

    function handleFileChange(event) {
        setProfileImage(event.target.files[0])
    }
    function handleUpdateProfileImage(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('user[profile_image]', profileImage)
        fetch("/me/update", { method: "PATCH", body: data })
        // dispatch(updateProfileImage(formData))
    }
    
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
                    <Button className="text-muted" variant="link" onClick={() => {setPopUpForm(true)}}>Update Profile Picture</Button>
                    {PopUpForm === false ? (null) : (
                        <Card className="mt-5">
                            <Form onSubmit={handleUpdateProfileImage} encType="multipart/form-data" >
                                <Form.Group controlId="formFile" className="mb-3">
                                <Form.Control type="file" onChange={handleFileChange} />
                                </Form.Group>
                                {/* {profileImageErrors.length > 0 && (
                                    <div style={{color: "red", listStylePosition: "inside"}}>
                                    {profileImageErrors.map((error) => (<li key={error}>{error}</li>))}
                                    </div>
                                )} */}
                                <Button variant="dark" type="submit">Upload</Button>
                                <Button variant="secondary" onClick={()=>setPopUpForm(false)}>Cancel</Button>
                            </Form> 
                        </Card>
                    )}
                </Card.Footer>
            </Card>
            
            <MyWines user={user} />

        </div>  
    )
}

export default Profile;