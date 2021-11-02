import { ReactSearchAutocomplete } from "react-search-autocomplete";

function SearchBar() {
  const items = [
    {
      id: 0,
      name: "Cobol",
    },
    {
      id: 1,
      name: "JavaScript",
    },
    {
      id: 2,
      name: "Basic",
    },
    {
      id: 3,
      name: "PHP",
    },
    {
      id: 4,
      name: "Java",
    },
  ];
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  // const handleOnHover = (result) => {
  //   // the item hovered
  //   console.log(result);
  // };

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item);
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
        onSearch={handleOnSearch}
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
