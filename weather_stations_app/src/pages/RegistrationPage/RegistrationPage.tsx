import "./RegistrationPage.css";
import { FC } from "react";
import { Container, Card , Form, Button} from "react-bootstrap";

export const RegistrationPage: FC = () => {
  return (
    <Container id="registration-page">
      <Card className="registration-page">
        <Card.Title className="largeText">Регистрация</Card.Title>
        <Card.Body className="card-body">
        <Form className="registration-form">
            <Form.Group className="mb-3" controlId="formLogin">
                <Form.Label>Логин</Form.Label>
                <Form.Control type="text" placeholder="Введите логин" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" placeholder="Введите пароль" />
            </Form.Group>
            <Button variant="secondary" type="submit" className="registration">
                Регистрация
            </Button>
        </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};