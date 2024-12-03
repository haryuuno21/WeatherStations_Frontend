import "./StationsPage.css";
import { FC, useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { InputField } from "../../components/InputField/InputField";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { StationCard } from "../../components/StationCard/StationCard";
import { useNavigate } from "react-router-dom";
import { STATIONS_MOCK } from "../../modules/mock";
import { useAppDispatch } from "../../store";
import { dataActions, useStationName } from "../../store/data";
import { ReportCard } from "../../components/ReportCard/ReportCard";
import { api,station } from '../../api'
import { useUserGroup } from "../../store/user";

export const StationsPage: FC = () => {
  const dispatch = useAppDispatch();
  const station_name = useStationName();
  const [loading, setLoading] = useState(false);
  const [stations, setStations] = useState<station[]>([]);
  const userGroup = useUserGroup();
  const navigate = useNavigate();

  const handleSearch = () => {
    setLoading(true);
    api.stations.stationsList({station_name:station_name})
      .then((response) => {
        setStations(
          response.data.stations
        );
        setLoading(false);
      })
      .catch(() => {
        setStations(STATIONS_MOCK.stations.filter((item)=>
        item.short_name.toLocaleLowerCase().search(station_name.toLocaleLowerCase())>=0))
        setLoading(false);
      })
  };
  const handleCardClick = (id?: number) => {
    navigate(`${ROUTES.STATIONS}/${id}`);
  };

  useEffect(()=>{
    handleSearch();
    return;
  },[])

  return (
    <Container id="stations-page">
      <Col xs={3} sm={5} md={7} lg={10}>
      <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.STATIONS }]} />
      
      <InputField
        value={station_name}
        setValue={(value) => dispatch(dataActions.setStationName(value))}
        loading={loading}
        onSubmit={handleSearch}
      />

      {loading && (
        <div className="loadingBg">
          <Spinner animation="border" />
        </div>
      )}
      {!loading &&
        (!stations.length ? (
          <div>
            <h1>К сожалению, ничего не найдено :(</h1>
          </div>
        ) : (
          <Row xs={1} sm={2} md={3} className="g-4">
            {stations.map((item, index) => (
              <Col className="station-card-col" key={index}>
                <StationCard
                  imageClickHandler={() => handleCardClick(item.id)}
                  {...item}
                />
              </Col>
            ))}
          </Row>
        ))
      }
      </Col>
    </Container>
  );
};