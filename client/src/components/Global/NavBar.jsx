import Container from 'react-bootstrap/Container'
import { LinkContainer } from 'react-router-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import SearchBar from '../Global/SearchBar'
import { useLocation } from 'react-router-dom'

function NavBar() {
  const location = useLocation()
  const onHomePage = location.pathname === '/'

  return (
    <Navbar bg='dark' variant='dark' expand='sm'>
      <Container fluid>
        <LinkContainer to='/'>
          <Navbar.Brand>Filmy</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav className='me-auto my-2 my-lg-0' navbarScroll>
            <LinkContainer to='/'>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/about'>
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
          {!onHomePage && <SearchBar type='nav' />}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
