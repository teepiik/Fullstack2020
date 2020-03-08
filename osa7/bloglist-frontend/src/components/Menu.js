import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Menu = () => {
    return (
        <div>
            <Navbar collapseOnSelect expand='md' bg='dark' variant='dark'>
                <Navbar.Toggle aira-controls='responsive-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='mr-auto'>
                        <Nav.Link href='#' as='span'>
                            <Link to='/'>Home</Link>
                        </Nav.Link>
                        <Nav.Link href='#' as='span'>
                            <Link to='/blogs'>Blogs</Link>
                        </Nav.Link>
                        <Nav.Link href='#' as='span'>
                            <Link to='/users'>Users</Link>
                        </Nav.Link>
                        <Nav.Link href='#' as='span'>
                            <Link to='/create'>Create</Link>
                        </Nav.Link>
                        <Nav.Link href='#' as='span'>
                            <Link className='menulink' to='/logout'>Logout</Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Menu