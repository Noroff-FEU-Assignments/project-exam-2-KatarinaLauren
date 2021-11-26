import { BookingUrl } from "../../../constants/api";
import PageHeading from "../../layout/PageHeading";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
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

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(BookingUrl, {
          headers: {
            Authorization: "Bearer " + authJWT,
          },
        })
        .then((response) => {
          console.log(response.data);
          setEnquiries(response.data);
        })
        .catch((error) => {
          // console.log(error);
          setError(error);
        });
    };
    fetchData();
  }, []);

  return (
    <Container>
      <PageHeading className="text-center mt-5">MESSAGES</PageHeading>
      <Alert variant="white" className="messages__alert">
        <p>Here you can see all messages sent via the contact form.</p>
      </Alert>
      {error && <ErrorMessage>Something went wrong. Unable to load messages</ErrorMessage>}
      <Accordion className="messages__accordion mb-5">
        {enquiries && <p>Got Data </p>}
        {enquiries
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map(function (item) {
            const { id, name, email, phone, created_at, message } = item;
            return <EnquiryItem key={id} id={id} name={name} phone={phone} date={created_at} email={email} message={message} />;
          })}
      </Accordion>
    </Container>
  );
}

export default ReadEnquiries;
