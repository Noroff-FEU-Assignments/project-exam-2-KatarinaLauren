import { MessageUrl } from "../../constants/api";
// import PageHeading from "../layout/PageHeading";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import { useState, useEffect } from "react";
import { getFromStorage } from "../../utilities/localStorage/localStorageFunctions";
import { authKey } from "../../constants/keys";
import MessageItem from "./MessageItem";

const authData = getFromStorage(authKey);
const authJWT = authData.jwt;

function SeeMessages() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(MessageUrl, {
          headers: {
            Authorization: "Bearer " + authJWT,
          },
        })
        .then((response) => {
          console.log(response.data);
          setMessages(response.data);
        })
        .catch((error) => {
          console.log(error);
          setError(error);
        });
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Accordion>
        {messages.map(function (message) {const { id, name, email, phone, published_at } = message; return <MessageItem key={id} name={name}
        </Accordion>
    </Container>
  );
}

export default SeeMessages;
