// import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
// import Form from "react-bootstrap/Form";
import { AccUrl, BaseUrl } from "./constants/api";
import { authKey } from "./constants/keys";
import { getFromStorage } from "./utilities/localStorage/localStorageFunctions";
import axios from "axios";

function TestPage() {
  const authData = getFromStorage(authKey);
  const authJWT = authData.jwt;

  const [files, setFiles] = useState();

  const uploadImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("files", files[0]);

    axios
      .put(BaseUrl + "/upload", formData, {
        headers: {
          Authorization: "Bearer " + authJWT,
        },
      })
      .then((response) => {
        console.log(response.data[0].id);
        const imageId = response.data[0].id;
        axios
          .post(
            AccUrl + "/77",
            { images: imageId },
            {
              headers: {
                Authorization: "Bearer " + authJWT,
              },
            }
          )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={uploadImage}>
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default TestPage;
