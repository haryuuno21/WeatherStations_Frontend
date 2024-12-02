import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css';
import { ROUTES } from '../../Routes';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <Navbar>
      <Container fluid>
        <Navbar.Brand as={Link} to="./" className="d-flex align-items-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="d-inline-block align-top"
          />
          <span className="ms-2">Метеостанции Москвы</span>
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to={ROUTES.STATIONS}>Метеостанции</Nav.Link>
          <Nav.Link as={Link} to={ROUTES.LOGIN}>Войти</Nav.Link>
          <Nav.Link as={Link} to={ROUTES.REGISTRATION}>Регистрация</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
