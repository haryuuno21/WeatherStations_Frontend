import "./StationInfoPage.css";
import { FC, useEffect, useState } from "react";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { useParams } from "react-router-dom";
import { IStation, getStationById } from "../../modules/weatherStationsAPI";
import { Container, Card } from "react-bootstrap";
import { STATIONS_MOCK } from "../../modules/mock";
import { DEFAULT_PHOTO_URL } from "../../modules/mock";

export const StationInfoPage: FC = () => {
  const [pageData, setPageData] = useState<IStation>();

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    getStationById(id)
      .then((response) => setPageData(response))
      .catch(()=>{
        setPageData(STATIONS_MOCK.stations[parseInt(id)])
      })
  }, [id]);

  return (
    <Container id="station-info-page">
      <BreadCrumbs
        crumbs={[
          { label: ROUTE_LABELS.STATIONS, path: ROUTES.STATIONS },
          { label: pageData?.short_name || "Станция" },
        ]}
      />
      <Card className="station-info" id="station-info">
        <Container>
          <Card.Img
            className="card-image"
            src={pageData?.photo_url || DEFAULT_PHOTO_URL}
            height={269}
            width={437}
          />
          <Card.Title className="largeText">{pageData?.full_name || 'Метеостанция'}</Card.Title>
        </Container>
        <Card.Body className="card-body">
          <Card.Text className="bold">Адрес станции:</Card.Text>
          <Card.Text>{pageData?.address || '–'}</Card.Text>
          <Card.Text className="bold">ФИО начальника:</Card.Text>
          <Card.Text>{pageData?.chief_fio || '–'}</Card.Text>
          <Card.Text className="bold">Номер телефона:</Card.Text>
          <Card.Text>{pageData?.phone_number || '–'}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};