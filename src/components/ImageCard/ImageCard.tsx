import { Image } from "../../types";
import "./ImageCard.module.css";

interface ImageCardProps {
  image: Image;
  onClick: (image: Image) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <div onClick={() => onClick(image)}>
      <img src={image.urls.small} alt={image.alt_description} />
    </div>
  );
};

export default ImageCard;
