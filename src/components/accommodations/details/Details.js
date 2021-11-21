import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getFromStorage } from "../../../utilities/localStorage/localStorageFunctions";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Description from "./Description";
import Spinner from "react-bootstrap/Spinner";
import ImageCarousel from "./ImageCarousel";
import PageHeading from "../../layout/PageHeading";
import Paragraph from "../../layout/Paragraph";
import Facilities from "./Facilities";
import Button from "react-bootstrap/Button";
import Location from "./Location";
import Info from "./Info";
import ContactInfo from "./ContactInfo";
import BookingModal from "./BookingModal";
import { accommodationKey } from "../../../constants/keys";

function Details() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let history = useHistory();
  const { id } = useParams();

  if (!id) {
    history.push("/");
  }

  useEffect(
    function () {
      const accommodations = getFromStorage(accommodationKey);
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

  const hotelImages = data.images;
  const facilities = data.facilities;
  // console.log(data);
  return (
    <>
      <BookingModal show={show} closeFunction={handleClose} accName={data.name} />
      <ImageCarousel images={hotelImages} />
      <Container>
        <PageHeading className={"text-center mt-5"}>{data.name.toUpperCase()}</PageHeading>
        <Facilities accFacilities={facilities} />
        <Button variant="success" className="d-block d-lg-none m-auto mt-4" size="lg" onClick={handleShow}>
          Book a room
        </Button>
        <Info category={data.category} location={data.location} room_rate={data.room_rate} />

        <div className={"d-flex flex-column flex-lg-row align-items-center align-items-lg-start justify-content-center mt-5"}>
          <Description description={data.description} />

          <div>
            <Button variant="success" className="d-none d-lg-block m-auto pe-5 ps-5" size="lg" onClick={handleShow}>
              Book a room
            </Button>

            <div className={"details__container__contact p-4 d-flex flex-row flex-wrap align-items-start"}>
              <ContactInfo address={data.address} phone={data.phone} email={data.email} />
              <div className={"ps-md-4 ps-lg-0"}>
                <Paragraph color={"#02a6b5"} fontWeight={"bold"} className={"mt-4 mt-md-0"}>
                  Location
                </Paragraph>
                <Location latitude={data.latitude} longitude={data.longitude} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Details;
