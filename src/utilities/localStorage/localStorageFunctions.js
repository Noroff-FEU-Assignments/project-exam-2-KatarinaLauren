export function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getFromStorage(key) {
  const storageData = localStorage.getItem(key);
  if (storageData === null) {
    return [];
  } else {
    return JSON.parse(storageData);
  }
}
