import PageHeading from "../layout/PageHeading";
import RenderAccommodations from "./RenderAccommodations";
import Container from "react-bootstrap/Container";
import Hero from "../layout/Hero";
import heroImage from "../../images/accommodation/accommodation_hero.jpg";
import Filters from "./Filters";

function Accommodations() {
  return (
    <>
      <Hero image={heroImage}>
        <PageHeading color={"#fff"}>ACCOMMODATIONS</PageHeading>
      </Hero>
      <Filters />
      <Container className={"d-flex flex-column justify-content-center"} fluid>
        <RenderAccommodations />
      </Container>
    </>
  );
}

export default Accommodations;
