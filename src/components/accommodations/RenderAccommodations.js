import { useState, useEffect } from "react";
import { getFromStorage } from "../../utilities/localStorage/localStorageFunctions";
import AccommodationItem from "./AccommodationItem";
import Alert from "react-bootstrap/Alert";
import { BaseUrl } from "../../constants/api";
import { filterData } from "../../utilities/filterFunctions";

const url = BaseUrl;

function RenderAccommodations() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    const accommodations = getFromStorage();
    if (accommodations.length > 0) {
      console.log(accommodations);
      setData(accommodations);
      setLoading(false);
    } else {
      setError("No information about accommodations available");
    }
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        <Alert variant="danger">An error occured: {error}</Alert>
      </div>
    );
  }

  return (
    <div className="accommodations">
      {data.filter(filterData).map(function (acc) {
        const imageUrl = acc.images[0].url;
        const image = url + imageUrl;
        const { id, name, location, room_rate } = acc;
        return <AccommodationItem key={id} id={id} name={name} location={location} rate={room_rate} image={image} />;
      })}
    </div>
  );
}

export default RenderAccommodations;
