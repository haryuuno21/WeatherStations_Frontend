import "./StationsPage.css";
import { FC, useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { InputField } from "../../components/InputField/InputField";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { StationCard } from "../../components/StationCard/StationCard";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { dataActions, useStationName } from "../../store/data";
import { ReportCard } from "../../components/ReportCard/ReportCard";
import { useUserGroup } from "../../store/user";
import { useCurrentPage, useStations } from "../../store/stations";
import { getStations, stationsActions } from "../../store/stations/slice";
import { PagesNavigation } from "../../components/PagesNavigation/PagesNavigation";

export const StationsPage: FC = () => {
  const dispatch = useAppDispatch();
  const station_name = useStationName();
  const [loading, setLoading] = useState(false);
  const currentPage = useCurrentPage();
  const stations = useStations();
  const userGroup = useUserGroup();
  const navigate = useNavigate();

  const handleSearch = () => {
    dispatch(stationsActions.firstPage())
    dispatch(getStations({stationName:station_name,page:"1"}))
    .then(()=>{
      setLoading(false)
    })
    return;
  }

  const handleCardClick = (id?: number) => {
    navigate(`${ROUTES.STATIONS}/${id}`);
  };

  useEffect(()=>{
    setLoading(true);
    dispatch(getStations({stationName:station_name,page:currentPage}))
      .then(()=>{
        setLoading(false)
      })
    return;
  },[currentPage])

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
          <div>
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
          </div>
        ))
      }
      <PagesNavigation/>
      </Col>
      {userGroup!='guest' && (<Col>
        <ReportCard></ReportCard>
      </Col>)}
    </Container>
  );
};