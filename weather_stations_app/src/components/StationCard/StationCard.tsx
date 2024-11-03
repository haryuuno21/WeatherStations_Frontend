import { FC } from "react";
import { Card } from "react-bootstrap";
import "./StationCard.css";
import { DEFAULT_PHOTO_URL } from "../../modules/mock";

interface ICardProps {
  photo_url?: string;
  short_name: string;
  sea_level: number;
  imageClickHandler: () => void;
}

export const StationCard: FC<ICardProps> = ({
  photo_url,
  short_name,
  sea_level,
  imageClickHandler,
}) => {

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
      </Card.Body>
    </Card>
  );
};