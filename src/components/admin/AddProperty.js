import React from "react";
import PropertyForm from "./propertyForm/PropertyForm";
import PageHeading from "../layout/PageHeading";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useState, useEffect } from "react";
import { getFromStorage, saveToStorage } from "../../utilities/localStorage/localStorageFunctions";
import { AccUrl, BaseUrl } from "../../constants/api";
import { accommodationKey, authKey } from "../../constants/keys";
import FormMessages from "../layout/FormMessages";
import Button from "react-bootstrap/Button";
import AdminDashboard from "./AdminDashboard";
import AddImages from "./propertyForm/AddImages";
// import Form from "react-bootstrap/Form";
// import FormError from "../../layout/FormError";

function AddProperty() {
  const authData = getFromStorage(authKey);
  const authJWT = authData.jwt;

  const [reset, setReset] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [data, setData] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [files, setFiles] = useState(null);
  const [images, setImages] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [refId, setRefId] = useState(null);

  function onSubmit(values) {
    setLoading(true);
    setDisabled(true);
    setError(null);
    setMessage(null);
    setData(values);
  }

  function onChange(e) {
    console.log(e.target.files[0]);
    setFiles(e.target.files[0]);
  }
  function addImage(e) {
    e.preventDefault();
    setImages(true);
  }

  useEffect(() => {
    if (images) {
      const uploadImage = async () => {
        // e.preventDefault();

        const formData = new FormData();

        formData.append("files", files);

        axios
          .post(BaseUrl + "/upload", formData, {
            headers: {
              Authorization: "Bearer " + authJWT,
            },
          })
          .then((response) => {
            console.log(response.data);
            setImages(false);
            setFiles(null);
            setUploadedImages((uploadedImages) => [...uploadedImages, response.data]);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      uploadImage();
    }
    console.log(uploadedImages);
    let result = uploadedImages.map((a) => a.id);
    console.log(result);
  }, [images, files, authJWT, uploadedImages]);

  useEffect(() => {
    if (data) {
      async function postData() {
        try {
          const response = await axios.post(AccUrl, data, {
            headers: {
              Authorization: "Bearer " + authJWT,
            },
          });

          console.log("response", response.data.id);
          setRefId(response.data.id);
          // setData(null);
          setMessage("Property has been added. Go to the accommodations page to check it out!");
          setReset("");
        } catch (error) {
          console.log("error", error);
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

  // useEffect(() => {
  //   if (files && refId) {
  //     async function postImage() {
  //       const formData = new FormData();
  //       formData.append("files", files[0]);
  //       formData.append("refId", refId);
  //       formData.append("ref", "accommodations");
  //       formData.append("field", "images");
  //       try {
  //         const response = await axios.post(BaseUrl + "/uploads", formData, {
  //           headers: {
  //             Authorization: "Bearer " + authJWT,
  //           },
  //         });

  //         console.log("response", response.data);
  //         setMessage("Property has been added. Go to the accommodations page to check it out!");
  //         setReset("");
  //       } catch (error) {
  //         console.log("error", error);
  //         setError("Something went wrong. Please try again or go to our contact page and let us know if the problem persists.");
  //         setReset(data);
  //       } finally {
  //         setLoading(false);
  //         setDisabled(false);
  //         setRefId(null);
  //         setFiles(null);
  //       }
  //     }
  //     postImage();
  //   }
  // }, [refId, reset, authJWT, files, data]);

  useEffect(() => {
    if (refId) {
      const addImages = () => {
        let result = uploadedImages.map((a) => a.foo);
        console.log(result);

        //   axios
        //     .put(AccUrl + "/" + refId, imagesToAdd, {
        //       headers: {
        //         Authorization: "Bearer " + authJWT,
        //       },
        //     })
        //     .then((response) => {
        //       console.log(response);
        //       setRefId("");
        //     })
        //     .catch((error) => {
        //       console.log(error);
        //     });
      };
      addImages();
    }
  });
  // , [refId, authJWT, uploadedImages]

  return (
    <AdminDashboard>
      <Container>
        <PageHeading className="text-center mt-5">ADD PROPERTY</PageHeading>
        <FormMessages error={error} message={message} loading={loading} />
        <AddImages onChange={onChange} addImage={addImage} />
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
