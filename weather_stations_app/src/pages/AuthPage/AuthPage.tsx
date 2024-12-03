import "./AuthPage.css";
import { FC, FormEvent, useState } from "react";
import { Container, Card , Form, Button} from "react-bootstrap";
import { ROUTES } from "../../Routes";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userActions } from "../../store/user";
import { useAppDispatch } from "../../store";

export const AuthPage: FC = () => {
  const dispatch = useAppDispatch();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitUser = (event:FormEvent) =>{
    event.preventDefault();
    axios.post('http://localhost:3000/api/users/authentication/',{
      username: login,
      password: password,
    }).then((response) =>{
        dispatch(userActions.setUserGroup(response.data["userGroup"]))
        dispatch(userActions.setUserName(response.data["userName"]))
        navigate(`${ROUTES.STATIONS}`)
    }).catch((response) => console.log(response.status))
  }

  return (
    <Container id="auth-page">
      <Card className="auth-page">
        <Card.Title className="largeText">Вход</Card.Title>
        <Card.Body className="card-body">
        <Form onSubmit={submitUser} className="login-form">
            <Form.Group className="mb-3" controlId="formLogin">
                <Form.Label>Логин</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Введите логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Button variant="secondary" type="submit" className="login">
                Войти
            </Button>
            <Card.Link as={Link} to={ROUTES.REGISTRATION}>Регистрация</Card.Link>
        </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};