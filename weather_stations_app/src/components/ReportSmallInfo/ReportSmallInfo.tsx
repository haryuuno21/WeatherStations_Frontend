import { FC, useState } from "react";
import { Button, Card } from "react-bootstrap";
import "./ReportSmallInfo.css"
import { report } from "../../api";

export const ReportSmallInfo: FC<report> = (report) => {
  return (
    <Card className="report-small-card">
      <Card.Body className="report-small-body">
        <Card.Title>Отчет №{report.id}</Card.Title>
        <Card.Text>Дата отчета: {report.report_date}</Card.Text>
        <Card.Text>Статус: {report.status}</Card.Text>
        <Button>Подробнее</Button>
      </Card.Body>
    </Card>
  );
};