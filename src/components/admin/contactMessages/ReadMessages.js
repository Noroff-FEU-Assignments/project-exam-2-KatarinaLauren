import { MessageUrl } from "../../../constants/api";
import PageHeading from "../../layout/PageHeading";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import { useState, useEffect } from "react";
import { getFromStorage } from "../../../utilities/localStorage/localStorageFunctions";
import { authKey } from "../../../constants/keys";
import ContactMessageItem from "./ContactMessageItem";
import ErrorMessage from "../../layout/messages/ErrorMessage";
import AdminDashboard from "../AdminDashboard";
import Spinner from "react-bootstrap/Spinner";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function ReadMessages() {
  const authData = getFromStorage(authKey);
  const authJWT = authData.jwt;
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    if (reload) {
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
            setError(null);
          })
          .catch((error) => {
            // console.log(error);
            setError("Something went wrong. Unable to load messages");
          })
          .finally(() => {
            setReload(false);
            setLoading(false);
          });
      };
      fetchData();
    }
  }, [authJWT, reload]);

  function deletePost(e) {
    const removeId = e.target.dataset.remove;
    confirmAlert({
      title: "Delete Message?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setDeleteItem(removeId);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }
  useEffect(() => {
    if (deleteItem > 0) {
      const id = deleteItem;
      const idUrl = MessageUrl + "/" + id;

      async function deleteData() {
        try {
          await axios.delete(idUrl, {
            headers: {
              Authorization: "Bearer " + authJWT,
            },
          });
        } catch (error) {
          setError("Unable to delete message");
        } finally {
          setDeleteItem(null);
          setReload(true);
        }
      }
      deleteData();
    }
  }, [deleteItem, authJWT]);

  return (
    <AdminDashboard>
      <Container>
        <PageHeading className="text-center mt-5 text-uppercase">Messages</PageHeading>
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
              return <ContactMessageItem key={id} id={id} name={name} phone={phone} date={published_at} email={email} message={message} deletePost={deletePost} />;
            })}
        </Accordion>
      </Container>
    </AdminDashboard>
  );
}

export default ReadMessages;
