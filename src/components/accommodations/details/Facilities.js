function Facilities(props) {
  const data = props.accFacilities;
  delete data.id;

  return (
    <div className={"d-flex flex-wrap justify-content-center align-items-center"}>
      {Object.entries(data).map(([key, value]) => {
        if (value === true) {
          return (
            <div className={"details__facilities d-flex flex-row justify-content-evenly align-items-center"}>
              <i class="fas fa-check d-none d-lg-block"></i>
              <p key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
            </div>
          );
        } else {
          return "";
        }
      })}
    </div>
  );
}

export default Facilities;
