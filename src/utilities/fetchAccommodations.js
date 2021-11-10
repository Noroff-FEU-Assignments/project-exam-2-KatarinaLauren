import { GetData } from "./GetData";
import { BaseUrl } from "../constants/api";
import { saveToStorage } from "./localStorage/localStorageFunctions";

const url = BaseUrl;

export function fetchAccommodations() {
  const { data } = GetData(url + "/accommodations");
  saveToStorage(data);
}
