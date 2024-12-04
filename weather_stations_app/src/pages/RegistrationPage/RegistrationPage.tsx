import axios, { AxiosResponse } from "axios";
import "./RegistrationPage.css";
import { FC, FormEvent, useState } from "react";
import { Container, Card , Form, Button} from "react-bootstrap";
import { ROUTES } from "../../Routes";
import { useNavigate } from "react-router-dom";

export const RegistrationPage: FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const registerUser = (event:FormEvent) =>{
    event.preventDefault();
    axios.post('http://localhost:3000/api/users/registration/',{
      username: login,
      password: password,
      email: email,
    }).then(() =>{
        navigate(`${ROUTES.LOGIN}`)
    }).catch((response:AxiosResponse) => console.log(response.status))
  }

  return (
    <Container id="registration-page">
      <Card className="registration-page">
        <Card.Title className="largeText">Регистрация</Card.Title>
        <Card.Body className="card-body">
        <Form onSubmit={registerUser} className="registration-form">
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
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Введите email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Button type="submit" variant="secondary" className="registration">
                Регистрация
            </Button>
        </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};