// import * as React from "react";
import { GetData } from "../../utilities/GetData";
import { BaseUrl } from "../../constants/api";

const url = BaseUrl;

function GetAccommodations() {
  const { data, error, isLoaded } = GetData(url + "/accommodations");
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
