import PageHeading from "../../layout/PageHeading";
import Container from "react-bootstrap/Container";
import SearchBar from "../../searchBar/SearchBar";
import { useState } from "react";
import RemovePropertyForm from "./RemovePropertyForm";
import axios from "axios";
import { BaseUrl } from "../../../constants/api";
import { authKey, accommodationKey } from "../../../constants/keys";
import { Link } from "react-router-dom";
import { getFromStorage, saveToStorage } from "../../../utilities/localStorage/localStorageFunctions";
import { GetData } from "../../../utilities/GetData";

const url = BaseUrl;
const accUrl = url + "/accommodations";

const authData = getFromStorage(authKey);
const authJWT = authData.jwt;

function RemoveProperty() {
  // const [disabled, setDisabled] = useState(true);
  const [defaultValues, setDefaultValues] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  // async function onSubmit(data) {
  //   setLoading(true);
  //   setError(null);
  //   setMessage(false);

  //   // console.log(data);

  //   try {
  //     const response = await axios.post(accUrl, data, {
  //       headers: {
  //         Authorization: "Bearer " + authJWT,
  //       },
  //     });

  //     console.log("response", response.data);
  //     setMessage(true);
  //     reset();
  //   } catch (error) {
  //     console.log("error", error);
  //     setError(true);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  async function onSubmit(data) {
    setLoading(true);
    setError(null);
    setMessage(false);

    const id = data.id;
    const stringId = "" + id;
    const idUrl = accUrl + "/" + stringId;

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
      const { accommodations } = GetData(url + "/accommodations");
      saveToStorage(accommodationKey, accommodations);
    }
  }

  const handleOnSelect = (item) => {
    console.log(typeof item.id);
    setDefaultValues(item);
    setData(item);
  };

  return (
    <Container>
      <PageHeading className="text-center mt-5 mb-5">Edit or Remove a property</PageHeading>
      <SearchBar onSelect={handleOnSelect} />
      {message && <p>Property added</p>}
      {data && (
        <div>
          {loading && <p>Loading...</p>}

          {error && (
            <p>
              Something went wrong. Please try again or <Link to="/contact">contact us</Link>
            </p>
          )}
          <RemovePropertyForm defaultValues={defaultValues} onSubmit={onSubmit} />
        </div>
      )}
    </Container>
  );
}

export default RemoveProperty;
