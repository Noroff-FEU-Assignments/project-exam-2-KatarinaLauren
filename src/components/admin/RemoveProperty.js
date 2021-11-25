import PageHeading from "../layout/PageHeading";
import Container from "react-bootstrap/Container";
import SearchBar from "../searchBar/SearchBar";
import { useState, useEffect } from "react";
import PropertyForm from "./propertyForm/PropertyForm";
import axios from "axios";
import { AccUrl } from "../../constants/api";
import { getFromStorage, saveToStorage } from "../../utilities/localStorage/localStorageFunctions";
import { accommodationKey, authKey } from "../../constants/keys";
import SuccessMessage from "../layout/SuccessMessage";
import Messages from "../layout/Messages";
import Button from "react-bootstrap/Button";

const authData = getFromStorage(authKey);
const authJWT = authData.jwt;

function RemoveProperty() {
  const [defaultValues, setDefaultValues] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [searchItems, setSearchItems] = useState([]);

  function onSubmit(values) {
    setLoading(true);
    setError(null);
    setMessage(false);
    setDeleteMessage(false);
    setData(values);
  }

  function onDelete(e) {
    if (window.confirm("Are you sure you wish to delete this property?")) {
      const id = e.target.form[1].value;
      setLoading(true);
      setError(null);
      setMessage(null);
      setDeleteMessage(false);
      setDeleteItem(id);
    }
  }

  // DELETE PROPERTY
  useEffect(() => {
    if (deleteItem > 0) {
      const id = deleteItem;
      const stringId = "" + id;
      const idUrl = AccUrl + "/" + stringId;

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

          console.log("DELETED", response.data);
          setDeleteMessage(true);
        } catch (error) {
          console.log("error", error);
          setError("Something went wrong. Please try again or go to our contact page and let us know if the problem persists.");
        } finally {
          setLoading(false);
          setDeleteItem(null);
          setDefaultValues([]);
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
      const idUrl = AccUrl + "/" + stringId;

      async function updateData() {
        try {
          const response = await axios.put(idUrl, data, {
            headers: {
              Authorization: "Bearer " + authJWT,
            },
          });

          console.log("response", response.data);
          setMessage("Property has been updated. Go to the accommodations page to check it out!");
        } catch (error) {
          console.log("error", error);
          setError("Something went wrong. Please try again or go to our contact page and let us know if the problem persists.");
        } finally {
          setLoading(false);
          setData("");
        }
      }
      updateData();
    }
  }, [data]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(AccUrl)
        .then((response) => {
          saveToStorage(accommodationKey, response.data);
          setSearchItems(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [deleteMessage, data]);

  const handleOnSelect = (item) => {
    setDefaultValues(item);
    setDisabled(false);
    setMessage(null);
    setError(null);
    setDeleteMessage(false);
  };

  return (
    <Container>
      <PageHeading className="text-center mt-5 mb-5">Edit or Remove a property</PageHeading>
      <SearchBar onSelect={handleOnSelect} items={searchItems} />

      <Messages error={error} message={message} loading={loading} />
      {deleteMessage && <SuccessMessage>Property has been removed.</SuccessMessage>}

      <PropertyForm key={defaultValues} onSubmit={onSubmit} reset={defaultValues} disabled={disabled} onDelete={onDelete}>
        <Button variant="success" type="submit" className="mt-4 pe-5 ps-5">
          Edit Property
        </Button>
        <Button variant="danger" className="mt-4 pe-5 ps-5 ms-md-4" onClick={onDelete}>
          Delete
        </Button>
      </PropertyForm>

      <Messages error={error} message={message} loading={loading} />
      {deleteMessage && <SuccessMessage>Property has been removed.</SuccessMessage>}
    </Container>
  );
}

export default RemoveProperty;
