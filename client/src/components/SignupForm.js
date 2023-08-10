import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {Button, Form} from 'react-bootstrap';

function SignupForm({ onSignin }){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

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
                password_confirmation: passwordConfirmation,
                image_url: ""
            }),
        })
        .then((r) => {
            setIsLoading(false);
            if (r.ok) {
              r.json().then((user) => onSignin(user));
            } else {
              r.json().then((err) => setErrors(err.errors));
            }
          });
    }
    return (
        <div className="form_div">
            <Form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <br/>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="text" 
                        placeholder="Create Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="password" 
                        placeholder="Create Password" 
                        value={password} onChange={(e) => 
                        setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="password" 
                        placeholder="Verify Password" 
                        value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}
                        autoComplete="current-password" 
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Button variant="primary" type="submit">{isLoading ? "Loading..." : "Signup"}</Button>
                </Form.Group>
                <Form.Group className="mb-3">
                    <p>
                        Already have an account? 
                        <Button variant="link" onClick={()=> navigate('/signin')}>Sign in</Button> 
                    </p>
                </Form.Group>
            </Form>
        </div>
    )
}

export default SignupForm;