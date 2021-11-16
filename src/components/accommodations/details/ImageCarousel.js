import Carousel from "react-bootstrap/Carousel";
import { BaseUrl } from "../../../constants/api";

function ImageCarousel(props) {
  const images = props.images;
  return (
    <Carousel>
      {images.map(function (image) {
        return (
          <Carousel.Item>
            <div className="details__carousel__image" style={{ backgroundImage: `url(${BaseUrl + image.url})` }} alt={image.alternativeText} />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default ImageCarousel;
