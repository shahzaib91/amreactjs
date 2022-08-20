import React from 'react'
import { Link } from 'react-router-dom'
import {Container, Nav, Navbar} from 'react-bootstrap';
import Logo from '../logo.svg';

export default function Header() {
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand to="/">
                    <img src={Logo} width="50px" alt="AwesomeMotive Blog" />
                    AwesomeMotive Blog
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll></Nav>
                    <Link className='btn btn-primary mx-2' to="/">All Posts</Link>
                    <Link className='btn btn-danger' to="/createPost">New Post</Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
