import PageHeading from "../layout/PageHeading";
import Container from "react-bootstrap/Container";
import SearchBar from "../searchBar/SearchBar";
import { useState, useEffect } from "react";
import PropertyForm from "./propertyForm/PropertyForm";
import axios from "axios";
import { AccUrl } from "../../constants/api";
import { getFromStorage } from "../../utilities/localStorage/localStorageFunctions";
import { authKey } from "../../constants/keys";
import SuccessMessage from "../layout/messages/SuccessMessage";
import ErrorLoadingMessage from "../layout/messages/ErrorLoadingMessage";
import Button from "react-bootstrap/Button";
import AdminDashboard from "./AdminDashboard";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function RemoveProperty() {
  const authData = getFromStorage(authKey);
  const authJWT = authData.jwt;
  const [defaultValues, setDefaultValues] = useState(false);
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
    confirmAlert({
      title: "Delete Property",
      message: "Are you sure you want to remove the property? All data will be lost.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const id = e.target.form[1].value;
            setLoading(true);
            setError(null);
            setMessage(null);
            setDeleteMessage(false);
            setDeleteItem(id);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }
  // DELETE PROPERTY
  useEffect(() => {
    if (deleteItem > 0) {
      const id = deleteItem;
      const stringId = "" + id;
      const idUrl = AccUrl + "/" + stringId;

      async function deleteData() {
        try {
          await axios.delete(
            idUrl,

            {
              headers: {
                Authorization: "Bearer " + authJWT,
              },
            }
          );

          // console.log("DELETED", response.data);
          setDeleteMessage(true);
          setDisabled(true);
        } catch (error) {
          // console.log("error", error);
          setError("Something went wrong. Please try again or go to our contact page and let us know if the problem persists.");
        } finally {
          setLoading(false);
          setDeleteItem(null);
          setDefaultValues([]);
        }
      }
      deleteData();
    }
  }, [deleteItem, authJWT]);

  //UPDATE PROPERTY

  useEffect(() => {
    if (data) {
      const id = data.id;
      const stringId = "" + id;
      const idUrl = AccUrl + "/" + stringId;

      async function updateData() {
        try {
          await axios.put(idUrl, data, {
            headers: {
              Authorization: "Bearer " + authJWT,
            },
          });

          // console.log("response", response.data);
          setMessage("Property has been updated. Go to the accommodations page to check it out!");
        } catch (error) {
          // console.log("error", error);
          setError("Something went wrong. Please try again or go to our contact page and let us know if the problem persists.");
        } finally {
          setLoading(false);
          setData("");
        }
      }
      updateData();
    }
  }, [data, authJWT]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(AccUrl)
        .then((response) => {
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
    <AdminDashboard>
      <Container>
        <PageHeading className="text-center mt-5 mb-5 text-uppercase">Edit or remove property</PageHeading>

        <ErrorLoadingMessage error={error} message={message} loading={loading} />
        {deleteMessage && <SuccessMessage>Property has been removed.</SuccessMessage>}

        <div className="div--bgWhite property__div pt-5 mt-4">
          <SearchBar onSelect={handleOnSelect} items={searchItems} placeholder={"Find property to edit..."} />
          <PropertyForm key={defaultValues} onSubmit={onSubmit} reset={defaultValues} disabled={disabled} onDelete={onDelete}>
            <div className="mb-5">
              <Button variant="success" type="submit" className="mt-4 pe-3 ps-3">
                Save changes
              </Button>
              <Button variant="danger" className="mt-4 pe-3 ps-3 ms-2 ms-md-4" onClick={onDelete}>
                Delete
              </Button>
            </div>
          </PropertyForm>
        </div>
        <ErrorLoadingMessage error={error} message={message} loading={loading} />
        {deleteMessage && <SuccessMessage>Property has been removed.</SuccessMessage>}
      </Container>
    </AdminDashboard>
  );
}

export default RemoveProperty;
