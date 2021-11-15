function Facilities(props) {
  const data = props.accFacilities;
  delete data.id;

  return (
    <div className={"d-flex flex-wrap justify-content-evenly"}>
      {Object.entries(data).map(([key, value]) => {
        if (value === true) {
          return (
            <div className={"details__facilities"}>
              <p key={key}>
                <i class="fas fa-check me-4 d-none d-md-inline-block"></i>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </p>
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
