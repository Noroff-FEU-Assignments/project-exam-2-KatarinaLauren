import PageHeading from "../../layout/PageHeading";
import Container from "react-bootstrap/Container";
import SearchBar from "../../searchBar/SearchBar";
import { useState, useEffect } from "react";
import RemovePropertyForm from "./RemovePropertyForm";
import axios from "axios";
import { BaseUrl } from "../../../constants/api";
import { Link } from "react-router-dom";
import { getFromStorage, saveToStorage } from "../../../utilities/localStorage/localStorageFunctions";
import { accommodationKey, authKey } from "../../../constants/keys";
import Spinner from "react-bootstrap/Spinner";
import SuccessMessage from "../../layout/SuccessMessage";
import ErrorMessage from "../../layout/ErrorMessage";

const url = BaseUrl;
const accUrl = url + "/accommodations";

const authData = getFromStorage(authKey);
const authJWT = authData.jwt;

function RemoveProperty() {
  const [defaultValues, setDefaultValues] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(false);

  function onSubmit(values) {
    setLoading(true);
    setError(null);
    setMessage(false);
    setDeleteMessage(false);
    setData(values);
  }

  function onDelete(e) {
    const id = e.target.form[1].value;
    setLoading(true);
    setError(null);
    setMessage(false);
    setDeleteMessage(false);
    setDeleteItem(id);
  }

  // DELETE PROPERTY
  useEffect(() => {
    if (deleteItem) {
      const id = deleteItem;
      const stringId = "" + id;
      const idUrl = accUrl + "/" + stringId;

      async function deleteData() {
        try {
          const response = await axios.delete(
            idUrl,

            {
              headers: {
                Authorization: "Bearer " + authJWT,
              },
            }
          );

          console.log("response", response.data);
          setDeleteMessage(true);
        } catch (error) {
          console.log("error", error);
          setError(true);
        } finally {
          setLoading(false);
          setDeleteItem(null);
        }
      }
      deleteData();
    }
  }, [deleteItem]);

  //UPDATE PROPERTY

  useEffect(() => {
    if (data) {
      const id = data.id;
      const stringId = "" + id;
      const idUrl = accUrl + "/" + stringId;

      async function updateData() {
        try {
          const response = await axios.put(idUrl, data, {
            headers: {
              Authorization: "Bearer " + authJWT,
            },
          });

          console.log("response", response.data);
          setDeleteMessage(true);
        } catch (error) {
          console.log("error", error);
          setError(true);
        } finally {
          setLoading(false);
          setData("");
        }
      }
      updateData();
    }
  }, [data]);

  // FETCH UPDATED DATA AND SET TO LOCAL STORAGE //

  useEffect(() => {
    if (message === true || deleteMessage === true) {
      const fetchData = () => {
        axios
          .get(accUrl)
          .then((response) => {
            saveToStorage(accommodationKey, response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      fetchData();
    }
  }, [message, deleteMessage]);

  const handleOnSelect = (item) => {
    setDefaultValues(item);
    setDisabled(false);
  };

  return (
    <Container>
      <PageHeading className="text-center mt-5 mb-5">Edit or Remove a property</PageHeading>
      <SearchBar onSelect={handleOnSelect} items={}/>
      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {deleteMessage && <SuccessMessage>Property has been removed.</SuccessMessage>}
      {message && (
        <SuccessMessage>
          Property has been updated. Go to <Link to="/accommodations">Accommodations</Link> to check it out.
        </SuccessMessage>
      )}

      {error && (
        <ErrorMessage>
          Something went wrong. Please try again or <Link to="/contact">Contact Us</Link> if the problem persists.
        </ErrorMessage>
      )}
      <RemovePropertyForm key={defaultValues} onSubmit={onSubmit} reset={defaultValues} disabled={disabled} onDelete={onDelete} />

      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {message && (
        <SuccessMessage>
          Property has been updated. Go to <Link to="/accommodations">Accommodations</Link> to check it out.
        </SuccessMessage>
      )}
      {deleteMessage && <SuccessMessage>Property has been removed.</SuccessMessage>}

      {error && (
        <ErrorMessage>
          Something went wrong. Please try again or <Link to="/contact">Contact Us</Link> if the problem persists.
        </ErrorMessage>
      )}
    </Container>
  );
}

export default RemoveProperty;
