import React from "react";
import PropertyForm from "./propertyForm/PropertyForm";
import PageHeading from "../layout/PageHeading";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useState, useEffect } from "react";
import { getFromStorage, saveToStorage } from "../../utilities/localStorage/localStorageFunctions";
import { AccUrl } from "../../constants/api";
import { accommodationKey, authKey } from "../../constants/keys";
import FormMessages from "../layout/FormMessages";
import Button from "react-bootstrap/Button";
import AdminDashboard from "./AdminDashboard";

function AddProperty() {
  const authData = getFromStorage(authKey);
  const authJWT = authData.jwt;

  const [reset, setReset] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [data, setData] = useState(null);
  const [disabled, setDisabled] = useState(false);

  function onSubmit(values) {
    setLoading(true);
    setDisabled(true);
    setError(null);
    setMessage(null);
    setData(values);
  }

  useEffect(() => {
    if (data) {
      async function postData() {
        try {
          const response = await axios.post(AccUrl, data, {
            headers: {
              Authorization: "Bearer " + authJWT,
            },
          });

          console.log("response", response.data);
          setMessage("Property has been added. Go to the accommodations page to check it out!");
          setReset("");
        } catch (error) {
          console.log("error", error);
          setError("Something went wrong. Please try again or go to our contact page and let us know if the problem persists.");
          setReset(data);
        } finally {
          setLoading(false);
          setDisabled(false);
        }
      }
      postData();
    }
  }, [data, reset, authJWT]);

  useEffect(() => {
    if (message) {
      const fetchData = () => {
        axios
          .get(AccUrl)
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

  return (
    <AdminDashboard>
      <Container>
        <PageHeading className="text-center mt-5">ADD PROPERTY</PageHeading>
        <FormMessages error={error} message={message} loading={loading} />
        <PropertyForm key={data} onSubmit={onSubmit} reset={reset} disabled={disabled}>
          <Button variant="success" type="submit" className="mt-4 mb-4 pe-5 ps-5">
            Add property
          </Button>
        </PropertyForm>
        <FormMessages error={error} message={message} loading={loading} />
      </Container>
    </AdminDashboard>
  );
}

export default AddProperty;
