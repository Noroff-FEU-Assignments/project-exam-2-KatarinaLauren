import { ReactSearchAutocomplete } from "react-search-autocomplete";

function SearchBar(props) {
  const formatResult = (item) => {
    return <p dangerouslySetInnerHTML={{ __html: "<strong>" + item + "</strong>" }}></p>;
  };
  return (
    <div className="m-auto mb-5 searchbar">
      <ReactSearchAutocomplete
        placeholder={props.placeholder}
        items={props.items}
        onSelect={props.onSelect}
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
