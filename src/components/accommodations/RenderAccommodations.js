import axios from "axios";
import { useState, useEffect } from "react";
import ErrorLoadingMessage from "../layout/messages/ErrorLoadingMessage";
import { AccUrl } from "../../constants/api";
import Filters from "./Filters";
import { getFromStorage } from "../../utilities/localStorage/localStorageFunctions";
import { facilitiesKey } from "../../constants/keys";
import Container from "react-bootstrap/Container";
import AccommodationList from "./AccommodationList";

const facilities = getFromStorage(facilitiesKey);

function RenderAccommodations() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [facilityFilter, setFacilityFilter] = useState({});

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      axios
        .get(AccUrl)
        .then((response) => {
          // console.log(response.data);
          setItems(response.data);
          setError(null);
        })
        .catch((error) => {
          // console.log(error);
          setError("Something went wrong. Unable to load accommodations");
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  function filterChange(e) {
    // console.log("Filter changed:", e.target.name, "set to ", e.target.checked);
    setFacilityFilter((prevFacilityFilter) => ({ ...prevFacilityFilter, [e.target.name]: e.target.checked }));
  }

  function resetFilters(e) {
    e.target.form.reset();
    setFacilityFilter({});
  }

  function filterBooking(item) {
    for (var i in facilityFilter) {
      let filterState = facilityFilter[i];
      let facilityState = item.facilities[i];

      if (filterState === true) {
        if (filterState !== facilityState) {
          return false;
        }
      }
    }

    return true;
  }

  return (
    <>
      <ErrorLoadingMessage error={error} loading={loading}></ErrorLoadingMessage>
      <Container className={"d-flex flex-column flex-lg-row justify-content-enter justify-content-lg-evenly mt-4 mb-5"}>
        <Filters filterValues={facilities} changeFunction={filterChange} resetFunction={resetFilters} />
        <AccommodationList items={items} filterBooking={filterBooking} />
      </Container>
    </>
  );
}

export default RenderAccommodations;
