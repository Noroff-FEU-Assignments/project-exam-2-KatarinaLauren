import { BookingUrl } from "../../../constants/api";
import PageHeading from "../../layout/PageHeading";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import { useState, useEffect } from "react";
import { getFromStorage } from "../../../utilities/localStorage/localStorageFunctions";
import { authKey } from "../../../constants/keys";
import EnquiryItem from "./EnquiryItem";
import ErrorMessage from "../../layout/ErrorMessage";
const authData = getFromStorage(authKey);
const authJWT = authData.jwt;

function ReadEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      axios
        .get(BookingUrl, {
          headers: {
            Authorization: "Bearer " + authJWT,
          },
        })
        .then((response) => {
          console.log(response.data);
          setEnquiries(response.data);
          setError(null);
          setLoading(false);
        })
        .catch((error) => {
          // console.log(error);
          setError(error);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  return (
    <Container>
      <PageHeading className="text-center mt-5">BOOKING ENQUIRIES</PageHeading>

      {error && <ErrorMessage>Something went wrong. Unable to load messages</ErrorMessage>}
      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      <Accordion className="bookings__accordion mb-5 mt-5">
        {enquiries
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map(function (item) {
            const { id, customer_name, email, phone_number, created_at, message, checkin_date, checkout_date, accommodation, number_of_guests } = item;
            return (
              <EnquiryItem
                key={id}
                id={id}
                name={customer_name}
                phone={phone_number}
                date={created_at}
                email={email}
                message={message}
                checkin={checkin_date}
                checkout={checkout_date}
                numberOfGuests={number_of_guests}
                accommodation={accommodation}
              />
            );
          })}
      </Accordion>
    </Container>
  );
}

export default ReadEnquiries;
