import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getFromStorage } from "../../../utilities/localStorage/localStorageFunctions";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Spinner from "react-bootstrap/Spinner";
import Carousel from "react-bootstrap/Carousel";
import { BaseUrl } from "../../../constants/api";
import PageHeading from "../../layout/PageHeading";
import Paragraph from "../../layout/Paragraph";
import Facilities from "./Facilities";
import Button from "react-bootstrap/Button";
import Location from "./Location";

function Details() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let history = useHistory();
  const { id } = useParams();

  if (!id) {
    history.push("/");
  }

  useEffect(
    function () {
      const accommodations = getFromStorage();
      if (accommodations.length > 0) {
        const accDetails = accommodations.filter((acc) => acc.id === parseInt(id));
        setData(accDetails[0]);
      } else {
        setError("An error occured");
      }
      setLoading(false);
    },
    [id]
  );

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (error) {
    return (
      <div>
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  const images = data.images;
  const facilities = data.facilities;
  console.log(data);
  return (
    <>
      <Carousel>
        {images.map(function (image) {
          return (
            <Carousel.Item>
              <div className="details__carousel__image" style={{ backgroundImage: `url(${BaseUrl + image.url})` }} alt={image.alternativeText} />
            </Carousel.Item>
          );
        })}
      </Carousel>
      <Container>
        <PageHeading className={"text-center mt-5"}>{data.name.toUpperCase()}</PageHeading>

        <div className={"d-flex align-items-center justify-content-center details__container__facilities"}>
          <i class="fas fa-check me-4 d-lg-none"></i>
          <Facilities accFacilities={facilities} />
        </div>
        <Button variant="success" className="d-block d-lg-none m-auto mt-4" size="lg">
          Book a room
        </Button>
        <div className={"mt-5 details__container__info text-center"}>
          <Paragraph>
            <span className={"label"}>Category: </span>
            {data.category}
          </Paragraph>
          <Paragraph>
            <span className={"label"}>Location: </span>
            {data.location}
          </Paragraph>
          <Paragraph>
            <span className={"label"}>Room rate from: </span>
            {data.room_rate} NOK
          </Paragraph>
        </div>

        <div className={"d-flex flex-column flex-lg-row align-items-center align-items-lg-start justify-content-center mt-5"}>
          <Accordion className={"mt-3 mt-lg-0 details__container__description"}>
            <Accordion.Item eventKey="0">
              <Accordion.Header className={"d-md-none"}>Description</Accordion.Header>
              <Accordion.Body>
                <Paragraph color={"#02a6b5"} fontWeight={"bold"} className={"d-none d-md-block"}>
                  Description
                </Paragraph>
                <p className={"ps-2 pe-2"}>{data.description}</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <div>
            <Button variant="success" className="d-none d-lg-block m-auto pe-5 ps-5" size="lg">
              Book a room
            </Button>
            <div className={"details__container__contact"}>
              <Paragraph color={"#02a6b5"} fontWeight={"bold"}>
                Contact information
              </Paragraph>
              <Paragraph>
                {" "}
                <i class="fas fa-map-marker-alt"></i>
                {data.address}
              </Paragraph>
              <Paragraph>
                {" "}
                <i class="fas fa-phone"></i>
                {data.phone}
              </Paragraph>
              <Paragraph>
                <i class="fas fa-envelope"></i>
                {data.email}
              </Paragraph>
              <Paragraph color={"#02a6b5"} fontWeight={"bold"} className={"mt-4"}>
                Location
              </Paragraph>
              <Location latitude={data.latitude} longitude={data.longitude} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Details;
