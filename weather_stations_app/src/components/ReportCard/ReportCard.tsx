import { FC } from "react";
import { Button, Card } from "react-bootstrap";
import "./ReportCard.css";

interface ICardProps {
  stations_count: number;
  buttonClickHandler: () => void;
}

export const ReportCard: FC<ICardProps> = ({
  stations_count,
  buttonClickHandler,
}) => {

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