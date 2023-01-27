import { Navbar, Container } from 'react-bootstrap'

function Header() {
  return (
    <header style={{ marginBottom: '5rem' }}>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Try out - Apollo GraphQL</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
