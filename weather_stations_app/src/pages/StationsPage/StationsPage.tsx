import "./StationsPage.css";
import { FC, useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { IStation, getStationsByName } from "../../modules/weatherStationsAPI";
import { InputField } from "../../components/InputField/InputField";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { StationCard } from "../../components/StationCard/StationCard";
import { useNavigate } from "react-router-dom";
import { ReportCard } from "../../components/ReportCard/ReportCard";
import { STATIONS_MOCK } from "../../modules/mock";
import {useDispatch} from "react-redux";
import { setStationNameAction, useStationName } from "../../slices/dataSlice";

export const StationsPage: FC = () => {
  const dispatch = useDispatch()
  const station_name = useStationName()
  const [loading, setLoading] = useState(false);
  const [stations, setStations] = useState<IStation[]>([]);
  const [stationsCount, setStationsCount] = useState(0);
  const navigate = useNavigate();

  const handleSearch = () => {
    setLoading(true);
    getStationsByName(station_name)
      .then((response) => {
        setStations(
          response.stations
        );
        setLoading(false);
        setStationsCount(response.stations_count)
      })
      .catch(() => {
        setStations(STATIONS_MOCK.stations.filter((item)=>
        item.short_name.toLocaleLowerCase().search(station_name.toLocaleLowerCase())>=0))
        setLoading(false);
        setStationsCount(STATIONS_MOCK.stations_count)
      })
  };
  const handleCardClick = (id: number) => {
    navigate(`${ROUTES.STATIONS}/${id}`);
  };

  const handleButtonClick = () =>{
    return;
  }

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
        setValue={(value) => dispatch(setStationNameAction(value))}
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
        ))}
      </Col>
      <Col>
        <ReportCard stations_count={stationsCount} buttonClickHandler={()=>handleButtonClick}></ReportCard>
      </Col>
    </Container>
  );
};