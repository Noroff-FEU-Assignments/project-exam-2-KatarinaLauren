import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Description from "./Description";
import ImageCarousel from "./ImageCarousel";
import PageHeading from "../../layout/PageHeading";
import Paragraph from "../../layout/Paragraph";
import Facilities from "./Facilities";
import Button from "react-bootstrap/Button";
import Location from "./Location";
import Info from "./Info";
import ContactInfo from "./ContactInfo";
import BookingModal from "./BookingModal";
import axios from "axios";
import { AccUrl } from "../../../constants/api";
import ErrorLoadingMessage from "../../layout/messages/ErrorLoadingMessage";

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

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      axios
        .get(AccUrl)
        .then((response) => {
          // console.log(response.data);
          const accommodations = response.data;
          const accDetails = accommodations.filter((acc) => acc.id === parseInt(id));
          setData(accDetails[0]);
          setError(null);
          setLoading(false);
        })
        .catch((error) => {
          setError("An error occurred");
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchData();
  }, [id]);

  return (
    <>
      <ErrorLoadingMessage error={error} loading={loading} />
      {data && (
        <>
          <BookingModal show={show} closeFunction={handleClose} accName={data.name} />

          <ImageCarousel images={data.images} />
          <Container>
            <PageHeading className={"text-center mt-5"}>{data.name.toUpperCase()}</PageHeading>
            <Facilities accFacilities={data.facilities} />
            <Button variant="success" className="d-block d-lg-none m-auto mt-4" size="lg" onClick={handleShow}>
              Book a room
            </Button>
            <Info category={data.category} location={data.location} room_rate={data.room_rate} />

            <div className={"d-flex flex-column flex-lg-row align-items-center align-items-lg-start justify-content-center mt-3 mt-md-5"}>
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
      )}
    </>
  );
}

export default Details;
