import axios from "axios";

export function postData(data, url) {
  const formData = new FormData();

  formData.append("data", JSON.stringify(data));
  axios
    .post(url, formData)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
