import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Container, Image, Button } from "react-bootstrap";

function NavBar({setUser, user, setShowSignin}){

  async function handleLogout() {
    try {
      const response = await fetch('/logout', { method: "DELETE" });
      if (response.ok) {
        setUser(null)
      } else {
        console.error("Logout failed:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

    return (
        <div> 
        <Navbar fixed="top" bg="light" data-bs-theme="light" >
          <Container fluid style={{marginLeft: "5px", marginRight: "5px"}}>
              <img src="winecon.png" alt="Wine Review Logo"
                style={{height: "60px", width: "60px", marginRight: "20px"}}
              />
              <Navbar.Brand as={Link} to="/" >Wine Review</Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/wines" className="link_style">Wines</Nav.Link>
                  <Nav.Link as={Link} to="/+wine" className="link_style">+ Wine</Nav.Link>
                </Nav>
                {user ? (
                  <Nav>
                    {user && user.image_url && (
                      <Image src={user.image_url} roundedCircle 
                        style={{
                          maxHeight: "40px"
                        }}
                      />
                    )}
                    <Nav.Link as={Link} to="/profile" className="link_style">
                      <Button style={{color: "#800022"}} variant="link">My Profile</Button>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/" >
                      <Button onClick={handleLogout} style={{color: "#800022"}} variant="outline-secondary">Logout</Button>
                    </Nav.Link>
                  </Nav>
                ) : (
                  <Nav>
                    <Nav.Link as={Link} to="/signin">
                      <Button 
                        onClick={()=>setShowSignin(false)}
                        style={{color: "#800022", borderBlockColor: "#800022"}} variant="outline-secondary">Sign Up</Button>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/signin">
                      <Button variant="outline-light" onClick={()=>setShowSignin(true)} style={{background: "#800022"}}>Sign In</Button>
                    </Nav.Link>
                  </Nav>
                )}
            </Container>
          </Navbar>
        </div>
    )
}

export default NavBar;