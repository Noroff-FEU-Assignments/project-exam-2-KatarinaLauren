import PageHeading from "../layout/PageHeading";
import RenderAccommodation from "./RenderAccommodation";
import Container from "react-bootstrap/Container";
import Hero from "../layout/Hero";
import heroImage from "../../images/accommodation/accommodation_hero.jpg";

function Accommodations() {
  return (
    <>
      <Hero image={heroImage}>
        <PageHeading color={"#fff"}>ACCOMMODATIONS</PageHeading>
      </Hero>
      <Container className={"d-flex flex-column justify-content-center"} fluid>
        <RenderAccommodation />
      </Container>
    </>
  );
}

export default Accommodations;
