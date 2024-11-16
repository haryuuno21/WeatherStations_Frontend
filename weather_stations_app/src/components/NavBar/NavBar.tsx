import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css';
import { ROUTES } from '../../Routes';

function Navigation() {
  return (
    <Navbar>
      <Container fluid>
        <Navbar.Brand href="./" className="d-flex align-items-center">
          <img
            src="http://localhost:9000/weather-station-images/logo.png"
            alt="Logo"
            className="d-inline-block align-top"
          />
          <span className="ms-2">Метеостанции Москвы</span>
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link href={ROUTES.STATIONS}>Метеостанции</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
