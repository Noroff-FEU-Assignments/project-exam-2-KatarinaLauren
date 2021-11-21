import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { getFromStorage } from "../../utilities/localStorage/localStorageFunctions";
import { useHistory } from "react-router-dom";
import { accommodationKey } from "../../constants/keys";

function SearchBar() {
  let history = useHistory();
  const items = getFromStorage(accommodationKey);

  // const handleOnSearch = (string, results) => {
  //   // onSearch will have as the first callback parameter
  //   // the string searched and for the second the results.
  //   console.log(string, results);
  // };

  // const handleOnHover = (result) => {
  //   // the item hovered
  //   console.log(result);
  // };
  const handleOnSelect = (item) => {
    // console.log(item.id);
    const route = `/detail/${item.id}`;
    history.push(route);
  };

  // const handleOnFocus = () => {
  //   console.log("Focused");
  // };

  const formatResult = (item) => {
    // return item;
    return <p dangerouslySetInnerHTML={{ __html: "<strong>" + item + "</strong>" }}></p>; //To format result as html
  };
  return (
    <div className="m-auto mb-5 searchbar">
      <ReactSearchAutocomplete
        placeholder={"Search for accommodations.."}
        items={items}
        onSelect={handleOnSelect}
        autoFocus
        formatResult={formatResult}
        styling={{
          fontFamily: "Open Sans",
          color: "#343638",
          borderRadius: "0.25rem",
          hoverBackgroundColor: "#02a6b5",
          placeholderColor: "#a6adb4",
        }}
      />
    </div>
  );
}

export default SearchBar;
