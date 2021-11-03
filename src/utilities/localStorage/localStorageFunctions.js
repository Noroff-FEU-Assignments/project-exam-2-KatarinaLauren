export function saveToStorage(data) {
  localStorage.setItem("accommodations", JSON.stringify(data));
}

export function getFromStorage() {
  const storageData = localStorage.getItem("accommodations");
  if (storageData === null) {
    return [];
  } else {
    return JSON.parse(storageData);
  }
}
