import { FC } from "react";
import { Button, Card } from "react-bootstrap";
import "./ReportSmallInfo.css"
import { report } from "../../api";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes";

export const ReportSmallInfo: FC<report> = (report) => {
  const navigate = useNavigate();
  return (
    <Card className="report-small-card">
      <Card.Body className="report-small-body">
        <Card.Title>Отчет №{report.id}</Card.Title>
        <Card.Text>Дата отчета: {report.report_date}</Card.Text>
        <Card.Text>Статус: {report.status}</Card.Text>
        <Button onClick={() => navigate(`${ROUTES.REPORTS}/${report.id}`)}>Подробнее</Button>
      </Card.Body>
    </Card>
  );
};