import { FC } from "react";
import { Button, Card } from "react-bootstrap";
import "./ReportCard.css";

export const ReportCard: FC = () => {
  return (
    <Card className="report-card">
      <Card.Body>
        <div className="textStyle">
          <Card.Title>Регистрация температур</Card.Title>
        </div>
        <div className="textStyle">
            <Card.Text>Добавлено метеостанций: {stations_count}</Card.Text>
        </div>
        {stations_count>0 && <Button onClick={buttonClickHandler}>Перейти к заполнению</Button>}
      </Card.Body>
    </Card>
  );
};