import "./ReportPage.css";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, CardText,Spinner, Button } from "react-bootstrap";
import { api, temperatureReport } from "../../api";
import { StationReportCard } from "../../components/StationReportCard/StationReportCard";
import { useAppDispatch } from "../../store";
import { reportActions } from "../../store/report";
import axios from "axios";
import { ROUTES } from "../../Routes";

export const ReportPage: FC = () => {
  const dispatch = useAppDispatch();
  const [pageData, setPageData] = useState<temperatureReport>();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const getPageData = (id:string) => {
    setLoading(true)
    api.reports.reportsRead(id)
      .then((response) => {
        setPageData(response.data)
        setLoading(false)
      })
  }

  const formReport = () => {
    if (!id) return;
    axios.put(`http://localhost:3000/api/reports/${id}/form/`)
    .then(()=>{
      dispatch(reportActions.clearReportInfo())
      navigate(`${ROUTES.STATIONS}`)
    })
  }

  const changeDate = () => {
    axios.put(`http://localhost:3000/api/reports/${id}/`,{"report-date":pageData?.report_date})
    .catch(()=>{if (!id) return; getPageData(id)})
  }

  useEffect(() => {
    if (!id) return;
    getPageData(id)
    return;
  }, [id]);

  const onRemoveStation = () => {
    if (!id) return;
    dispatch(reportActions.removeStation());
    getPageData(id)
  }

  return (
    <Container id="report-info-page">
      <Card className="report-info">
        <Container className="report-header">
          <Card.Title className="largeText">Регистрация температур</Card.Title>
          <div className="date-input-block">
                <span>Дата:  </span>
                <input className="report-date-input" placeholder={"01.01.2024"}
                    disabled={pageData?.status != "Draft"}
                    value={pageData?.report_date|| "01.01.2024"}
                    onChange={(event)=>
                      { const newDate = event.target.value.trim()
                        setPageData((prevData)=>{
                        if (!prevData) return prevData;
                        return {
                          ...prevData,
                          report_date:newDate
                        }
                      })}}
                    onBlur={(event) => {
                        const newDate = event.target.value.trim();
                        const isValidDate = /^\d{2}\.\d{2}\.\d{4}$/.test(newDate);
                        if (!isValidDate) {
                          alert("Введите дату в формате ДД.ММ.ГГГГ");
                          return;
                        }
                        setPageData((prevData) => {
                          if (!prevData) return prevData;
                          return {
                            ...prevData,
                            report_date: newDate,
                          };
                        });
                        changeDate();
                      }}
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
                is_draft = {pageData.status == "Draft"}
                report_id = {id}
                stationReport={item}
                onRemove={onRemoveStation}
              />
            </div>
          ))
        ))}
        {pageData?.status=="Draft" && <Button onClick={formReport} className="form-button">Сформировать</Button>}
        </Card.Body>
        
      </Card>
    </Container>
  );
};