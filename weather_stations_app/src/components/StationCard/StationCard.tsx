import { FC, useState } from "react";
import { Button, Card } from "react-bootstrap";
import "./StationCard.css";
import { DEFAULT_PHOTO_URL } from "../../modules/mock";
import { useUserGroup } from "../../store/user";
import axios from "axios";
import { useAppDispatch } from "../../store";
import { reportActions } from "../../store/report";

interface ICardProps {
  id?: number;
  photo_url?: string | null;
  short_name: string;
  sea_level?: number;
  imageClickHandler: () => void;
}

export const StationCard: FC<ICardProps> = ({
  id,
  photo_url,
  short_name,
  sea_level,
  imageClickHandler,
}) => {
  const dispatch = useAppDispatch();
  const userGroup = useUserGroup();
  const [disabled,setDisabled] = useState(false);
  const addStation = () =>{
    axios.post(`http://localhost:3000/api/stations/${id}/add-to-report/`)
    .then((response)=>{
      dispatch(reportActions.addStation())
      dispatch(reportActions.setCurrentReport(response.data["currentReport"]))
      setDisabled(true)
    })
    .catch(()=>setDisabled(true))
  }
  
  return (
    <Card className="station-card">
      <Card.Img
        className="cardImage"
        variant="top"
        src={photo_url || DEFAULT_PHOTO_URL}
        height={154}
        width={164}
        onClick={imageClickHandler}
      />
      <Card.Body className="station-card-body">
        <Card.Title>{short_name}</Card.Title>
        <Card.Text>Высота над уровнем моря: {sea_level}</Card.Text>
        {userGroup!="guest" && <Button disabled={disabled} onClick={addStation} className="add-btn">Добавить</Button>}
      </Card.Body>
    </Card>
  );
};