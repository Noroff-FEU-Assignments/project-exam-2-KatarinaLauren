import axios from "axios";
import { saveToStorage } from "../utilities/localStorage/localStorageFunctions";
import { AccUrl } from "./api";
import { facilitiesKey } from "./keys";

export function getFacilities() {
  axios
    .get(AccUrl)
    .then((response) => {
      const data = response.data;
      const facilityData = data[0].facilities;
      const facilityNames = Object.keys(facilityData);
      // console.log(facilityNames);
      facilityNames.shift();
      saveToStorage(facilitiesKey, facilityNames);
    })
    .catch((error) => {
      console.log(error);
    });
}
