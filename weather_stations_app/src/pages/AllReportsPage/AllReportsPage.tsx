import "./AllReportsPage.css";
import { FC, useEffect, useState } from "react";
import { Container, Card, Spinner, Button } from "react-bootstrap";
import { api, report } from "../../api";
import { ReportSmallInfo } from "../../components/ReportSmallInfo/ReportSmallInfo";

export const AllReportsPage: FC = () => {
    const [reports, setReports] = useState<report[]>();
    const [status, setStatus] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      setLoading(true)
        api.reports.reportsList({status:status,"start-date":startDate,"end-date":endDate})
        .then((response) => {setReports(response.data);setLoading(false)})
        return;
    }, []);

    const onApplyFilter = () =>{
      setLoading(true)
      api.reports.reportsList({status:status,"start-date":startDate,"end-date":endDate})
      .then((response) => {setReports(response.data);setLoading(false)})
      return;
    }

    return (
    <Container id="reports-page">
      <Card className="reports-header">
      <Container>
          <Card.Title className="largeText">Отчеты пользователя</Card.Title>
          <div className="reports-filters">
            <input
              placeholder="Статус"
              id="status-filter"
              value={status}
              onChange={(event) => setStatus(event.target.value.trim())}
            ></input>
            <input
              className="date-filter"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value.trim())}
              type="date"
            ></input>
            <h2>-</h2>
            <input
              className="date-filter"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value.trim())}
              type="date"
            ></input>
            <Button variant="secondary" onClick={onApplyFilter}>Фильтр</Button>
          </div>
        </Container>
      </Card>
      <Card className="reports-info " id="reports-info">
        <Card.Body className="card-body">
        <div className="report-card-col">
          <Card className="header-card">
          <Card.Text className="report-card-id">Отчет №</Card.Text>
          <Card.Text className="report-card-date">Дата отчета</Card.Text>
        <Card.Text className="report-card-status">Статус</Card.Text>
        <Card.Text className="report-card-formed">Дата формирования</Card.Text>
        <Card.Text className="report-card-temperature">Средняя температура</Card.Text>
        <Card.Text className="report-card-text"></Card.Text>
          </Card>
        </div>
        {loading && (
        <div className="loadingBg">
          <Spinner animation="border" />
        </div>)
        }
        {!loading &&
        (!reports?.length ? (
          <div>
          </div>
        ) : (reports.map((item, index) => (
            <div className="report-card-col" key={index}>
              <ReportSmallInfo {...item}/>
            </div>
          ))
        ))}
        </Card.Body>
      </Card>
    </Container>
  );
};