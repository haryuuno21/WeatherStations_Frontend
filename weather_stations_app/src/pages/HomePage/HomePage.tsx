import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Routes";
import {Carousel, Col, Container, Row } from "react-bootstrap";
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
          <Carousel className="Carousel">
            <Carousel.Item className="CaruselItem">
              <img className="CarouselImage" src="/0.png"/>
              <Carousel.Caption>
                <h3>ВДНХ</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="CaruselItem">
              <img className="CarouselImage" src="/1.png"/>
              <Carousel.Caption>
                <h3>Балчуг</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="CaruselItem">
            <img className="CarouselImage" src="/2.png"/>
              <Carousel.Caption>
                <h3>Тушино</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="CaruselItem">
              <img className="CarouselImage" src="/3.png"/>
              <Carousel.Caption>
                <h3>Михайловское</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};
