import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Container, Image } from "react-bootstrap";

function NavBar({setUser, user}){
  function handleLogout() {
    fetch('/logout', {method: "DELETE"})
    .then(r => setUser(null))
  }
    return (
        <div> 
        <Navbar fixed="top" bg="light" data-bs-theme="light" >
            <Container>
              <Navbar.Brand as={Link} to="/">Wine Review</Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/wines">Wines</Nav.Link>
                  <Nav.Link as={Link} to="/+wine">+ Wine</Nav.Link>
                </Nav>
                {user ? (
                  <Nav>
                    {user && user.image_url && (
                      <Image src={user.image_url} roundedCircle 
                        style={{
                          maxHeight: "40px", 
                          marginRight: "10px"
                        }}
                      />
                    )}
                    {/* <Image src={user.image_url} roundedCircle 
                      style={{
                        maxHeight: "40px", 
                        marginRight: "10px"
                      }}
                    /> */}
                    <Nav.Link as={Link} to="/profile">My Profile</Nav.Link>
                    <Nav.Link as={Link} to="/" onClick={handleLogout}>Logout</Nav.Link>
                  </Nav>
                ) : (
                  <Nav>
                    <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                    <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>
                  </Nav>
                )}
            </Container>
          </Navbar>
        </div>
    )
}

export default NavBar;