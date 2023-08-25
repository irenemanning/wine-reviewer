import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {Button, Form} from 'react-bootstrap';


function SigninForm({user, onSignin}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    

    function handleSubmit(e) {
        e.preventDefault()
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
        .then((r) => {
            setIsLoading(false);
            if (r.ok) {
              r.json().then((user) => {
                    onSignin(user)
                    navigate("/");
                });
            } else {
              r.json().then((err) => setErrors(err.errors));
            }
        });
    }
    return (
        <div className="form_div">
            <Form onSubmit={handleSubmit}>
                <h2>Sign in</h2>
                <br/>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control 
                        type="password" 
                        placeholder="Enter Password" 
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Button variant="primary" type="submit">
                    {isLoading ? "Loading..." : "Sign in"}
                </Button>
                </Form.Group>
                <Form.Group className="mb-3">
                    <p>
                        Don't have an account?  
                        <Button variant="link" onClick={() => navigate('/signup')} >Sign up</Button> 
                    </p>
                </Form.Group> 
            </Form>
        </div>
    )
}

export default SigninForm;