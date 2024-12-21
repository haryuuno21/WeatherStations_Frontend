import "./ReportPage.css";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, CardText,Spinner, Button } from "react-bootstrap";
import { StationReportCard } from "../../components/StationReportCard/StationReportCard";
import { useAppDispatch } from "../../store";
import { ROUTES } from "../../Routes";
import { stationsActions } from "../../store/stations";
import { useReportInfo } from "../../store/reports";
import { changeReportDate, deleteReport, formReport, getReportInfo, reportsActions } from "../../store/reports/slice";

export const ReportPage: FC = () => {
  const dispatch = useAppDispatch();
  const pageData = useReportInfo();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const getPageData = (id:string) => {
    setLoading(true)
    dispatch(getReportInfo(id)).then(()=>setLoading(false))
  }

  const onDeleteReport = () =>{
    if (!id) return;
    dispatch(deleteReport(id))
    .then(()=>{
      dispatch(stationsActions.clearReportInfo())
      navigate(`${ROUTES.STATIONS}`)
    })
  }

  const onFormReport = () => {
    if (!id) return;
    dispatch(formReport(id))
    .then(()=>{
      dispatch(stationsActions.clearReportInfo())
      navigate(`${ROUTES.STATIONS}`)
    })
  }

  const changeDate = () => {
    if(!pageData?.report_date || !id) return
    dispatch(changeReportDate({id:id,data:pageData.report_date})).then(()=>getPageData(id))
  }

  useEffect(() => {
    if (!id) return;
    getPageData(id)
    return;
  }, [id]);

  const onRemoveStation = () => {
    if (!id) return;
    dispatch(stationsActions.removeStation());
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
                    onChange={(event) => {
                      const newDate = event.target.value.trim();
                      if (!pageData) return;
                      dispatch(
                        reportsActions.setReportInfo({
                          ...pageData,
                          report_date: newDate,
                        })
                      );
                    }}
                    onBlur={(event) => {
                        const newDate = event.target.value.trim();
                        const isValidDate = /^\d{2}\.\d{2}\.\d{4}$/.test(newDate);
                        if (!isValidDate) {
                          alert("Введите дату в формате ДД.ММ.ГГГГ");
                          return;
                        }
                        if (!pageData) return;
                        dispatch(
                          reportsActions.setReportInfo({
                            ...pageData,
                            report_date: newDate,
                          })
                        );
                        changeDate();
                      }}
                    type="text"/>
            </div>
        </Container>
        <Card.Body className="report-body">
          <div className="header-with-bin">
            <CardText>Добавленные метеостанции:</CardText>
            {pageData?.status=="Draft" &&
            <input
              type="image"
              id="bin-image"
              alt="Удалить"
              src="http://localhost:9000/weather-station-images/bin_icon.png"
              onClick={onDeleteReport}
            />}
          </div>
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
        {pageData?.status=="Draft" && <Button onClick={onFormReport} className="form-button">Сформировать</Button>}
        </Card.Body>
        
      </Card>
    </Container>
  );
};