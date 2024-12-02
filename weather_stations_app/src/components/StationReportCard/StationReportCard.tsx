import { FC, useState } from "react";
import { Card } from "react-bootstrap";
import "./StaionReportCard.css"
import { DEFAULT_PHOTO_URL } from "../../modules/mock";
import { StationReport } from "../../api/Api";

export const StationReportCard: FC<StationReport> = ({
  temperature,
  station_id,
  short_name,
  photo_url
}) => {

  const [temp, setTemperature] = useState(temperature?.toString())

  return (
    <Card className="station-report-card">
      <Card.Img
        className="cardImage station-report-image"
        variant="top"
        src={photo_url || DEFAULT_PHOTO_URL}
      />
      <Card.Body className="station-report-body">
        <Card.Title>{short_name}</Card.Title>
        <input className="temperature-input" 
        value={temp}
        onChange={(event) => setTemperature(event.target.value)} type="number"/>
        УДАЛИТЬ
      </Card.Body>
    </Card>
  );
};