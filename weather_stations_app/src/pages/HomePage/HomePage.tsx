import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Routes";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./HomePage.css"

export const HomePage: FC = () => {
  return (
    <Container fluid id="home-page">
      <Row className="text-center">
        <Col>
          <h1>Метеостанции Москвы</h1>
          <p>
            Добро пожаловать на сайт метеостанций Москвы! Здесь вы можете найти всю
            необходимую информацию о существующих метеостанциях.
          </p>
          <Link to={ROUTES.STATIONS}>
            <Button variant="primary">Список метеостанций</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
