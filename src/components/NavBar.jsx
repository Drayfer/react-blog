import React from "react"
import { Navbar, Container, Nav } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"
import AddPost from "./AddPost"

function NavBar() {
	return (
		<div>
			<Navbar bg="light" expand="lg">
				<Container fluid>
					<Navbar.Brand>
						<Link to={`/react-blog`}>React Blog</Link>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="navbarScroll" />
					<Navbar.Collapse id="navbarScroll">
						<Nav
							className="me-auto my-2 my-lg-0"
							style={{ maxHeight: "100px" }}
							navbarScroll
						>
							<Nav.Link>
								<NavLink to="/react-blog" end>
									Home
								</NavLink>
							</Nav.Link>
							<Nav.Link>
								<NavLink to="/react-blog/about" end>
									About
								</NavLink>
							</Nav.Link>
						</Nav>
						<AddPost />
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	)
}

export default NavBar
