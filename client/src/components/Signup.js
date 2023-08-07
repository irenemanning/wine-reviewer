import React, { useState } from "react";
import {Button, Form} from 'react-bootstrap';

function Signup(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    // const [imageUrl, setImageUrl] = useState("");
    // const [errors, setErrors] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault()
        fetch("/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              password,
              password_confirmation: passwordConfirmation
            //   image_url: imageUrl
            }),
        })
        // .then((r) => {
        //     setIsLoading(false);
        //     if (r.ok) {
        //       r.json().then((user) => onLogin(user));
        //     } else {
        //       r.json().then((err) => setErrors(err.errors));
        //     }
        //   });
        .then(r => {
           r.json() 
        })
        .then(data => {
            console.log(data)
        })
    }
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                    Hehehe.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password} onChange={(e) => 
                        setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                </Form.Group>
                <Form.Group>
                <Form.Label>Verify Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}
                        autoComplete="current-password" 
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Sign up</Button>
            </Form>
        </div>
    )
}

export default Signup;