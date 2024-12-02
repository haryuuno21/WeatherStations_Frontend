import "./ReportPage.css";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, CardText,Spinner, Button } from "react-bootstrap";
import { api, temperatureReport } from "../../api";
import { format } from 'date-fns'
import { StationReportCard } from "../../components/StationReportCard/StationReportCard";

export const ReportPage: FC = () => {
  const [pageData, setPageData] = useState<temperatureReport>();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    setLoading(true)
    api.reports.reportsRead(id)
      .then((response) => {
        setPageData(response.data)
        setLoading(false)
      })
    return;
  }, [id]);

  return (
    <Container id="report-info-page">
      <Card className="report-info">
        <Container className="report-header">
          <Card.Title className="largeText">Регистрация температур</Card.Title>
          <div className="date-input-block">
                <span>Дата:  </span>
                <input className="report-date-input" placeholder={
                    format(new Date(pageData?.report_date|| "01.01.2024"), 'dd.MM.yyyy')}
                    type="text"/>
            </div>
        </Container>
        <Card.Body className="report-body">
            <CardText>Добавленные метеостанции:</CardText>
            {loading && (
        <div className="loadingBg">
          <Spinner animation="border" />
        </div>
      )}
      {!loading &&
        (!pageData?.stations.length ? (
          <div>
          </div>
        ) : (pageData.stations.map((item, index) => (
            <div className="station-card-col" key={index}>
              <StationReportCard
                {...item}
              />
            </div>
          ))
        ))}
        <Button className="form-button">Сформировать</Button>
        </Card.Body>
        
      </Card>
    </Container>
  );
};