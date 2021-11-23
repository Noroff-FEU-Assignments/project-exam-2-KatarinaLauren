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

  function onSubmit(values) {
    setLoading(true);
    setError(null);
    setMessage(false);
    setData(values);
  }

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
          setMessage(true);
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
    if (message === true) {
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
  }, [message]);

  const handleOnSelect = (item) => {
    setDefaultValues(item);
    setDisabled(false);
  };

  return (
    <Container>
      <PageHeading className="text-center mt-5 mb-5">Edit or Remove a property</PageHeading>
      <SearchBar onSelect={handleOnSelect} />
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

      {error && (
        <ErrorMessage>
          Something went wrong. Please try again or <Link to="/contact">Contact Us</Link> if the problem persists.
        </ErrorMessage>
      )}
      <RemovePropertyForm key={defaultValues} onSubmit={onSubmit} reset={defaultValues} disabled={disabled} />
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

      {error && (
        <ErrorMessage>
          Something went wrong. Please try again or <Link to="/contact">Contact Us</Link> if the problem persists.
        </ErrorMessage>
      )}
    </Container>
  );
}

export default RemoveProperty;
