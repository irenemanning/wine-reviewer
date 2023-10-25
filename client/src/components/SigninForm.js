import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Button, Form} from 'react-bootstrap';
import { AuthContext } from "../contexts/AuthContext";

function SigninForm({setShowSignin}){
    const { user, setUser } = useContext(AuthContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    
    async function handleSubmit(e) {
        e.preventDefault()
        if (user) {
            navigate('/')
        }
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
        const data = await response.json()
        setIsLoading(false)
        if (response.ok) {
            setUser(data)
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
                {errors.length > 0 && (
                    <ul style={{color: "red", listStylePosition: "inside"}}>
                    {errors.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                    </ul>
                )}
                <Form.Group className="mb-3">
                    <Button variant="outline-light" type="submit" style={{background: "#800022"}}>
                    {isLoading ? "Loading..." : "Sign in"}
                </Button>
                </Form.Group>
                <Form.Group className="mb-3">
                    <p>
                        Don't have an account?  
                        <Button variant="link" onClick={() => setShowSignin(false)} style={{color: "#800022"}} >Sign up</Button> 
                    </p>
                </Form.Group> 
            </Form>
        </div>
    )
}

export default SigninForm;