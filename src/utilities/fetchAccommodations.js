// import * as React from "react";
import { GetData } from "./GetData";
import { BaseUrl } from "../constants/api";
import { saveToStorage } from "./localStorage/localStorageFunctions";

const url = BaseUrl;

export function fetchAccommodations() {
  const { data } = GetData(url + "/accommodations");
  saveToStorage(data);
}
// if (error !== null) {
//   return <div>Error: {error.message}</div>;
// }
// if (!isLoaded) {
//   return <div>Loading...</div>;
// }
//   return (
//     <div>
//       items
//       {data.map((item) => (
//         <div key={item.id}>{item.id}</div>
//       ))}
//     </div>
//   );
// }

// export default GetAccommodations;
