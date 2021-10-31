import GetAccommodations from "./GetAccommodations";
import Heading from "../layout/Heading";

function Accommodations() {
  return (
    <>
      <Heading color={"#000"} fontSize={"3rem"}>
        ACCOMMODATIONS
      </Heading>
      <GetAccommodations />
    </>
  );
}

export default Accommodations;
