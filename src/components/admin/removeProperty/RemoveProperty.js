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
import { GetData } from "../../../utilities/GetData";

const url = BaseUrl;
const accUrl = url + "/accommodations";

const authData = getFromStorage(authKey);
const authJWT = authData.jwt;

function RemoveProperty() {
  const { data } = GetData(BaseUrl + "/accommodations");
  saveToStorage(accommodationKey, data);
  // const isMounted = useRef(false);
  const [defaultValues, setDefaultValues] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [datas, setData] = useState([]);
  const [disabled, setDisabled] = useState(true);
  // const [dataToPost, setDataToPost] = useState(getFromStorage(accommodationKey));

  function onSubmit(values) {
    setLoading(true);
    setError(null);
    setMessage(false);
    setData(values);
  }

  //UPDATE PROPERTY

  useEffect(() => {
    if (datas.lenght > 0) {
      const id = datas.id;
      const stringId = "" + id;
      const idUrl = accUrl + "/" + stringId;

      async function updateData() {
        try {
          const response = await axios.put(idUrl, datas, {
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
        }
      }
      updateData();
    }
  }, [datas]);

  // FETCH UPDATED DATA AND SET TO LOCAL STORAGE //

  // useEffect(() => {
  //   if (message === true) {
  //     const fetchData = () => {
  //       axios
  //         .get(accUrl)
  //         .then((response) => {
  //           saveToStorage(accommodationKey, response.data);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     };
  //     fetchData();
  //   }
  // }, [message]);

  // async function onSubmit(values) {
  //   setLoading(true);
  //   setError(null);
  //   setMessage(false);

  //   const id = values.id;
  //   const stringId = "" + id;
  //   const idUrl = accUrl + "/" + stringId;

  //   try {
  //     const response = await axios.put(idUrl, data, {
  //       headers: {
  //         Authorization: "Bearer " + authJWT,
  //       },
  //     });

  //     console.log("response", response.data);
  //     setMessage(true);
  //   } catch (error) {
  //     console.log("error", error);
  //     setError(true);
  //   } finally {
  //     setLoading(false);
  //     setData("");
  //   }
  // }

  const handleOnSelect = (item) => {
    setDefaultValues(item);
    setDisabled(false);
  };

  return (
    <Container>
      <PageHeading className="text-center mt-5 mb-5">Edit or Remove a property</PageHeading>
      <SearchBar onSelect={handleOnSelect} />
      {loading && <Spinner animation="border" variant="primary" />}
      {message && <p>Property added</p>}

      {loading && <p>Loading...</p>}

      {error && (
        <p>
          Something went wrong. Please try again or <Link to="/contact">contact us</Link>
        </p>
      )}
      <RemovePropertyForm key={defaultValues} onSubmit={onSubmit} reset={defaultValues} disabled={disabled} />
      {loading && <Spinner animation="border" variant="primary" />}
      {message && <p>Property added</p>}

      {loading && <p>Loading...</p>}

      {error && (
        <p>
          Something went wrong. Please try again or <Link to="/contact">contact us</Link>
        </p>
      )}
    </Container>
  );
}

export default RemoveProperty;
