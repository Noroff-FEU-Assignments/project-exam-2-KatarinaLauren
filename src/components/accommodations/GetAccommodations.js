// import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../../constants/api";

const url = BaseUrl;

const GetData = (url) => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(url)
        .then((response) => {
          setIsLoaded(true);
          setData(response.data);
        })
        .catch((error) => {
          setError(error);
        });
    };
    fetchData();
  }, [url]);

  return { error, isLoaded, data };
};

function GetAccommodations() {
  const { data, error, isLoaded } = GetData(url + "accommodations");
  console.log(data);

  if (error !== null) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      items
      {data.map((item) => (
        <div key={item.id}>{item.id}</div>
      ))}
    </div>
  );
}

export default GetAccommodations;
