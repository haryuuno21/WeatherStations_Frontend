import { FC } from "react";
import { Button, Card } from "react-bootstrap";
import "./ReportSmallInfo.css"
import { report } from "../../api";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes";
import { format, parseISO } from "date-fns";

export const ReportSmallInfo: FC<report> = (report) => {
  const navigate = useNavigate();
  const status_to_rus = {"Formed":"Сформирован",
                          "Completed":"Завершен",
                          "Rejected":"Отклонен",
                          "Draft":"Черновик",
                          "Deleted":"Удален"
                        }
  return (
    <Card className="report-small-card">
      <Card.Body className="report-small-body">
        <Card.Title className="report-card-id">{report.id}</Card.Title>
        <Card.Text className="report-card-date">{report.report_date}</Card.Text>
        <Card.Text className="report-card-status">{status_to_rus[report.status]}</Card.Text>
        <Card.Text className="report-card-formed">{format(parseISO(report.formation_date), "dd.MM.yyyy HH:mm")}</Card.Text>
        <Card.Text className="report-card-temperature">{report.average_temperature || "–"}</Card.Text>
        <Button onClick={() => navigate(`${ROUTES.REPORTS}/${report.id}`)}>Подробнее</Button>
      </Card.Body>
    </Card>
  );
};