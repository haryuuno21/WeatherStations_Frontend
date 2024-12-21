import { FC } from "react";
import { Button, Card } from "react-bootstrap";
import "./ReportCard.css";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes";
import { useCurrentReport, useStationsCount } from "../../store/stations";

export const ReportCard: FC = () => {
  const stationsCount = useStationsCount();
  const currentReport = useCurrentReport();
  const navigate = useNavigate();
  const viewReport = () => {
    navigate(`${ROUTES.REPORTS}/${currentReport}`)
  }
  
  return (
    <Card className="report-card">
      <Card.Body>
        <div className="textStyle">
          <Card.Title>Регистрация температур</Card.Title>
        </div>
        <div className="textStyle">
            <Card.Text>Добавлено метеостанций: {stationsCount}</Card.Text>
        </div>
        {currentReport && <Button onClick={viewReport}>Перейти к заполнению</Button>}
      </Card.Body>
    </Card>
  );
};