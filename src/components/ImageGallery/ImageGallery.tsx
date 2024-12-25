import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";
import { Image } from "../../types";

interface ImageGalleryProps {
  images: Image[];
  onClick: (image: Image) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onClick }) => {
  return (
    <ul className={styles.imageGallery}>
      {images.map((image) => (
        <li key={image.id}>
          <div className={styles.imageCard}>
            <ImageCard image={image} onClick={onClick} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
