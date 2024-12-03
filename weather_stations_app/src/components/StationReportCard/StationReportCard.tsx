import { FC, useState } from "react";
import { Button, Card } from "react-bootstrap";
import "./StaionReportCard.css"
import { DEFAULT_PHOTO_URL } from "../../modules/mock";
import { StationReport } from "../../api/Api";
import axios from "axios";

interface ICardProps{
  stationReport:StationReport;
  report_id?:string;
  onRemove: (stationId:string) => void;
}

export const StationReportCard: FC<ICardProps> = ({
  stationReport,
  report_id,
  onRemove,
}) => {

  const [temp, setTemperature] = useState(stationReport.temperature?.toString());

  const changeTemp = () =>{
    axios.put(`http://localhost:3000/api/stations-reports/${report_id}/${stationReport.station_id}/put_temperature/`,
      {"temperature":parseInt(temp?.toString()||"0")}
    )
  }

  return (
    <Card className="station-report-card">
      <Card.Img
        className="cardImage station-report-image"
        variant="top"
        src={stationReport.photo_url || DEFAULT_PHOTO_URL}
      />
      <Card.Body className="station-report-body">
        <Card.Title>{stationReport.short_name}</Card.Title>
        <input className="temperature-input" 
        value={temp}
        onBlur={changeTemp}
        onChange={(event) => setTemperature(event.target.value)} type="number"/>
        <Button onClick={() => onRemove(stationReport?.station_id||"")}>Удалить</Button>
      </Card.Body>
    </Card>
  );
};