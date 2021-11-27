import Carousel from "react-bootstrap/Carousel";

function ImageCarousel(props) {
  const images = props.images;
  return (
    <Carousel>
      {images.map(function (image) {
        return (
          <Carousel.Item key={image.id}>
            <div className="details__carousel__image" style={{ backgroundImage: `url(${image.url})` }} alt={image.alternativeText} />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default ImageCarousel;
