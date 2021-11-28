import { MessageUrl } from "../../../constants/api";
import PageHeading from "../../layout/PageHeading";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import { useState, useEffect } from "react";
import { getFromStorage } from "../../../utilities/localStorage/localStorageFunctions";
import { authKey } from "../../../constants/keys";
import MessageItem from "./MessageItem";
import ErrorMessage from "../../layout/ErrorMessage";
import AdminDashboard from "../AdminDashboard";
import Spinner from "react-bootstrap/Spinner";

function ReadMessages() {
  const authData = getFromStorage(authKey);
  const authJWT = authData.jwt;
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      axios
        .get(MessageUrl, {
          headers: {
            Authorization: "Bearer " + authJWT,
          },
        })
        .then((response) => {
          // console.log(response.data);
          setMessages(response.data);
          setLoading(false);
        })
        .catch((error) => {
          // console.log(error);
          setError(error);
          setLoading(false);
        });
    };
    fetchData();
  }, [authJWT]);

  return (
    <AdminDashboard>
      <Container>
        <PageHeading className="text-center mt-5">MESSAGES</PageHeading>
        <Alert variant="white" className="messages__alert">
          <p>Here you can see all messages sent via our contact form.</p>
        </Alert>
        {error && <ErrorMessage>Something went wrong. Unable to load messages</ErrorMessage>}
        {loading && (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
        <Accordion className="messages__accordion mb-5">
          {messages
            .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
            .map(function (item) {
              const { id, name, email, phone, published_at, message } = item;
              return <MessageItem key={id} id={id} name={name} phone={phone} date={published_at} email={email} message={message} />;
            })}
        </Accordion>
      </Container>
    </AdminDashboard>
  );
}

export default ReadMessages;
