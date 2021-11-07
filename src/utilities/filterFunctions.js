let filterValues = [];

function createFilter(acc) {
  filterValues.forEach(function (item) {
    let facility = `acc.facilities.${item}`
    if (facility === true){
      return true;
    } 
  );
}

export function filterData(acc) {
  createFilter(acc);
  // if (acc.name.toLowerCase().startsWith("h")) {
  //   return true;
  // }
  // if (acc.category === "Guesthouse" || acc.category === "Hotel" || acc.category === "BB") {
  //   return true;
  // }
  // if (acc.facilities.seaview === true) {
  // return true;
  // }
}

function addToFilter(item) {
  filterValues.push(item);
  console.log(filterValues);
}

function removeFromFilter(item) {
  console.log("removed" + item);
}

export function handleChange(e) {
  const name = e.target.name;
  if (e.target.checked === true) {
    addToFilter(name);
  } else {
    removeFromFilter(name);
  }
}
