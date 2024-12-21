import { FC, useState } from "react";
import { Button, Card } from "react-bootstrap";
import "./StaionReportCard.css"
import { DEFAULT_PHOTO_URL } from "../../modules/mock";
import { StationReport } from "../../api/Api";
import { useAppDispatch } from "../../store";
import { deleteStationFromReport, putTemperature } from "../../store/stations/slice";

interface ICardProps{
  stationReport:StationReport;
  is_draft:boolean;
  report_id?:string;
  onRemove: (stationId:string) => void;
}

export const StationReportCard: FC<ICardProps> = ({
  stationReport,
  report_id,
  is_draft,
  onRemove,
}) => {
  const dispatch = useAppDispatch();
  const [temp, setTemperature] = useState(stationReport.temperature?.toString());

  const removeStaion = () =>{
    if(!report_id || !stationReport.station_id) return
    dispatch(deleteStationFromReport({reportID:report_id, stationID:stationReport.station_id}))
    .then(()=>{
      onRemove(stationReport?.station_id||"");
    })
  }

  const changeTemp = () =>{
    if(!report_id || !stationReport.station_id) return
    dispatch(putTemperature({reportID:report_id,stationID:stationReport.station_id,temp:parseInt(temp?.toString()||"0")}))
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
        disabled={!is_draft}
        value={temp}
        onBlur={changeTemp}
        onChange={(event) => setTemperature(event.target.value)} type="number"/>
        {is_draft && <Button onClick={() => removeStaion()}>Удалить</Button>}
      </Card.Body>
    </Card>
  );
};