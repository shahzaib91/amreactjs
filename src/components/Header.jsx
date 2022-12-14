import React from 'react'
import { Link } from 'react-router-dom'
import {Container, Nav, Navbar} from 'react-bootstrap';
import Logo from '../logo.svg';
import { List, Plus } from 'react-bootstrap-icons';
import Config from '../globals/Config';

export default function Header() {

    const {appName} = Config();

    return (
        <Navbar bg="light" expand="lg" fixed='top'>
            <Container>
                <Navbar.Brand>
                    <Link to="/" style={{textDecoration:"none", color:"#000"}}>
                        <img src={Logo} width="50px" alt="AwesomeMotive Blog" />
                        {appName}
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll></Nav>
                    <Link className='btn btn-primary mx-2' to="/"><List /> All Posts</Link>
                    <Link className='btn btn-danger' to="/createPost"><Plus /> New Post</Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
