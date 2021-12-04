import { BookingUrl } from "../../../constants/api";
import PageHeading from "../../layout/PageHeading";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import { useState, useEffect } from "react";
import { getFromStorage } from "../../../utilities/localStorage/localStorageFunctions";
import { authKey } from "../../../constants/keys";
import EnquiryItem from "./EnquiryItem";
import ErrorLoadingMessage from "../../layout/messages/ErrorLoadingMessage";
import AdminDashboard from "../AdminDashboard";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function ReadEnquiries() {
  const authData = getFromStorage(authKey);
  const authJWT = authData.jwt;

  const [enquiries, setEnquiries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    if (reload) {
      const fetchData = () => {
        setLoading(true);

        axios
          .get(BookingUrl, {
            headers: {
              Authorization: "Bearer " + authJWT,
            },
          })
          .then((response) => {
            // console.log(response.data);
            setEnquiries(response.data);
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
      const idUrl = BookingUrl + "/" + id;

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
        <PageHeading className="text-center mt-5 text-uppercase">Booking Enquiries</PageHeading>
        <ErrorLoadingMessage error={error} loading={loading} />
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
                  deletePost={deletePost}
                />
              );
            })}
        </Accordion>
      </Container>
    </AdminDashboard>
  );
}

export default ReadEnquiries;
