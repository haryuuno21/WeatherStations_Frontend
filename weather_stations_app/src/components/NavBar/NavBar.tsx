import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css';
import { ROUTES } from '../../Routes';
import { Link, useNavigate } from 'react-router-dom';
import { FC, MouseEvent} from 'react';
import { userActions, useUserGroup, useUserName } from '../../store/user';
import axios from 'axios';
import { useAppDispatch } from '../../store';
import { dataActions } from '../../store/data';
import { reportActions } from '../../store/report';

export const Navigation: FC = () => {
  const dispatch = useAppDispatch();
  const userName = useUserName();
  const userGroup = useUserGroup();
  const navigate = useNavigate();

  const logout = (event: MouseEvent) =>{
    event.preventDefault();
    axios.post('http://localhost:3000/api/users/deauthorization/').then(() =>{
        dispatch(userActions.logout())
        dispatch(dataActions.setStationName(""))
        dispatch(reportActions.clearReportInfo())
        navigate(`${ROUTES.STATIONS}`)
    }).catch((response) => console.log(response.status))
  }

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
          <Nav.Link style={{marginRight: "50px"}} as={Link} to={ROUTES.STATIONS}>Метеостанции</Nav.Link>
          {
            userGroup == "guest" ?
            (<Nav.Link as={Link} to={ROUTES.REGISTRATION}>Регистрация</Nav.Link>):
            (<Nav.Item className='user-name'>{userName}</Nav.Item>)
          }
          {
            userGroup == "guest" ?
            (<Nav.Link as={Link} to={ROUTES.LOGIN}>Войти</Nav.Link>) : 
            (<Nav.Link onClick={logout} as={Link} to={ROUTES.STATIONS}>Выйти</Nav.Link>)
          }
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
