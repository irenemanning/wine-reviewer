import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {Button, Form} from 'react-bootstrap';
import { AuthContext } from "../contexts/AuthContext";

function SignupForm({ setShowSignin }){
    const { setUser } = useContext(AuthContext)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [image_url, setImage_url] = useState("")
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        const response = await fetch("/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                password_confirmation: passwordConfirmation,
                image_url
            }),
        })
        const data = await response.json()
        setIsLoading(false)
        if (response.ok) {
            setUser(data)
            setImage_url("Default_Avatar.png")
            navigate("/")
        } else {
            if (data.errors && Array.isArray(data.errors)) {
                setErrors(data.errors);
            } else {
                console.log("Invalid error response:", data);
            }
        }
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
                {errors.length > 0 && (
                    <ul style={{color: "red", listStylePosition: "inside"}}>
                    {errors.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                    </ul>
                )}
                <Form.Group className="mb-3">
                    <Button variant="outline-light" type="submit" style={{background: "#800022"}}>{isLoading ? "Loading..." : "Signup"}</Button>
                </Form.Group>
                <Form.Group className="mb-3">
                    <p>
                        Already have an account? 
                        <Button variant="link" onClick={() => setShowSignin(true)} style={{color: "#800022"}}>Sign in</Button> 
                    </p>
                </Form.Group>
            </Form>
        </div>
    )
}

export default SignupForm;