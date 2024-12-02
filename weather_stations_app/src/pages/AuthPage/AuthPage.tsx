import "./AuthPage.css";
import { FC } from "react";
import { Container, Card , Form, Button} from "react-bootstrap";
import { ROUTES } from "../../Routes";
import { Link } from "react-router-dom";

export const AuthPage: FC = () => {
  return (
    <Container id="auth-page">
      <Card className="auth-page">
        <Card.Title className="largeText">Вход</Card.Title>
        <Card.Body className="card-body">
        <Form className="login-form">
            <Form.Group className="mb-3" controlId="formLogin">
                <Form.Label>Логин</Form.Label>
                <Form.Control type="text" placeholder="Введите логин" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" placeholder="Введите пароль" />
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