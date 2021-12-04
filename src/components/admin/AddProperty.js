import React from "react";
import PropertyForm from "./propertyForm/PropertyForm";
import PageHeading from "../layout/PageHeading";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useState, useEffect } from "react";
import { getFromStorage } from "../../utilities/localStorage/localStorageFunctions";
import { AccUrl, BASE_URL } from "../../constants/api";
import { authKey } from "../../constants/keys";
import ErrorLoadingMessage from "../layout/messages/ErrorLoadingMessage";
import Button from "react-bootstrap/Button";
import AdminDashboard from "./AdminDashboard";
import AddImages from "./propertyForm/AddImages";
import Paragraph from "../layout/Paragraph";

function AddProperty() {
  const authData = getFromStorage(authKey);
  const authJWT = authData.jwt;

  const [reset, setReset] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [data, setData] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [file, setFile] = useState(null);
  const [images, setImages] = useState(false);
  const [imageName, setImageName] = useState("");
  const [refId, setRefId] = useState(null);

  // HANDLE SUBMIT
  function onSubmit(values) {
    if (images) {
      setLoading(true);
      setDisabled(true);
      setError(null);
      setMessage(null);
      setImageName("");
      setData(values);
    } else {
      setError("You must ad an image to upload");
    }
  }

  // HANDLE CHOOSE IMAGE FILE
  function onChange(e) {
    // console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  }

  // HANDLE SUBMIT IMAGE
  function addImage(e) {
    e.preventDefault();
    if (file) {
      e.target.reset();
      setImages(true);
      setImageName(file.name);
    }
  }

  // HANDLE DELETE IMAGE
  function deleteImage() {
    setImages(false);
    setFile(null);
    setImageName("");
  }

  // POST ACCOMMODATION
  useEffect(() => {
    if (data) {
      async function postData() {
        try {
          const response = await axios.post(AccUrl, data, {
            headers: {
              Authorization: "Bearer " + authJWT,
            },
          });

          // console.log("response", response.data.id);
          setRefId(response.data.id);
          setMessage("Property has been added. Go to the accommodations page to check it out!");
          setReset("");
        } catch (error) {
          // console.log("error", error);
          setError("Something went wrong. Please try again or go to our contact page and let us know if the problem persists.");
          setReset(data);
        } finally {
          setLoading(false);
          setDisabled(false);
          setData("");
        }
      }
      postData();
    }
  }, [data, reset, authJWT]);

  // UPLOAD IMAGE IF IMAGE IS ADDED AND ACCOMMODATION ID EXISTS + ADD IMAGE TO THE ACCOMMODATION
  useEffect(() => {
    if (images && refId) {
      const uploadImage = async () => {
        const formData = new FormData();
        formData.append("files", file);

        axios
          .post(BASE_URL + "/upload", formData, {
            headers: {
              Authorization: "Bearer " + authJWT,
            },
          })
          .then((response) => {
            setImages(false);
            setFile(null);
            const responseData = response.data[0].id;

            axios
              .put(
                AccUrl + "/" + refId,
                { images: responseData },
                {
                  headers: {
                    Authorization: "Bearer " + authJWT,
                  },
                }
              )
              .then((response) => {
                // console.log(response);
                setRefId(null);
              })
              .catch((error) => {
                // console.log(error);
              });
          })
          .catch((error) => {
            // console.log(error);
            setError("Something went wrong. Please try again or go to our contact page and let us know if the problem persists.");
          });
      };
      uploadImage();
    }
  }, [images, file, authJWT, refId]);

  return (
    <AdminDashboard>
      <Container>
        <PageHeading className="text-center mt-5 text-uppercase">Add property</PageHeading>
        <ErrorLoadingMessage error={error} message={message} loading={loading} />
        <div className="div--bgWhite property__div pt-3 mt-4">
          <AddImages onChange={onChange} addImage={addImage} imageName={imageName} deleteImage={deleteImage} />
          <PropertyForm key={data} onSubmit={onSubmit} reset={reset} disabled={disabled}>
            <Button variant="success" type="submit" className="mt-4 mb-4 pe-5 ps-5 me-4">
              {loading ? "Adding..." : "Add property"}
            </Button>
            <Paragraph className="fst-italic text-center mb-4 pt-3" color={"#02a6b5"}>
              All fields are required*
            </Paragraph>
          </PropertyForm>
        </div>
        <ErrorLoadingMessage error={error} message={message} loading={loading} />
      </Container>
    </AdminDashboard>
  );
}

export default AddProperty;
