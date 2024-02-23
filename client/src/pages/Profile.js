import React, { useState, useEffect } from "react"
import { Form, Card, Button, Image } from "react-bootstrap"
import MyWines from "../components/MyWines"

function Profile({user}) {
    const [profileImage, setProfileImage] = useState(null)
    const [PopUpForm, setPopUpForm] = useState(false)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        setProfileImage(user.profile_image || null)
    }, [user])

    function handleFileChange(event) {
        setProfileImage(event.target.files[0])
    }

    function handleUpdateProfileImage(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('wuser[profile_image]', profileImage) 

        fetch("/me/update", { method: "PATCH", body: formData })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update profile image')
            }
            return response.json()
        })
        .then(data => {
            setProfileImage(data.profile_image)
            setErrors([])
            setPopUpForm(false)
        })
        .catch(error => {
            setErrors([error.message || 'An error occurred'])
            console.error('Error updating profile image:', error.message)
        })
    }
    
    return (
        <div className="mt-5">
            <Card className="mt-5" style={{ maxWidth: '400px' }}>

            {user.profile_image === null ? (
                <Image 
                roundedCircle
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
                <Image 
                roundedCircle
                variant="top" 
                src={profileImage}  
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
                                {errors.length > 0 && (
                                    <div style={{color: "red", listStylePosition: "inside"}}>
                                    {errors.map((error) => (<li key={error}>{error}</li>))}
                                    </div>
                                )}
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

export default Profile