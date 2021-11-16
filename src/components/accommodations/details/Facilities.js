function Facilities(props) {
  const data = props.accFacilities;
  delete data.id;

  return (
    <div className={"d-flex align-items-center justify-content-center details__container__facilities"}>
      <i class="fas fa-check me-4 d-lg-none"></i>
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
            return (
              <div className={"details__facilities details__facilities--false"}>
                <p key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Facilities;
