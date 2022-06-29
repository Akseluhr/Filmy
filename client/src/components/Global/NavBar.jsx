import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { LinkContainer } from 'react-router-bootstrap'
import { useLocation } from 'react-router-dom'

function NavBar() {
  let searchBar = (
    <Form className='d-flex'>
      <Form.Control
        type='search'
        placeholder='Search for a movie title'
        className='me-2'
        aria-label='Search'
      />
      <Button variant='outline-success'>Search</Button>
    </Form>
  )

  const location = useLocation()

  if (location.pathname === '/') {
    searchBar = null
  }

  return (
    <Navbar bg='dark' variant='dark' expand='md'>
      <Container fluid>
        <LinkContainer to='/'>
          <Navbar.Brand>Filmy</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <LinkContainer to='/'>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/about'>
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
          {searchBar}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
