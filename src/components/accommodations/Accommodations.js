import PageHeading from "../layout/PageHeading";
import Container from "react-bootstrap/Container";
import Hero from "../layout/Hero";
import heroImage from "../../images/accommodation/accommodation_hero.jpg";
import RenderAccommodations from "./RenderAccommodations";

function Accommodations() {
  return (
    <div className={"h-100 accommodation__container"}>
      <Hero image={heroImage}>
        <PageHeading color={"#fff"} className={"text-uppercase"}>
          Accommodations
        </PageHeading>
      </Hero>
      <Container className={"d-flex flex-column justify-content-center align-items-center"} fluid>
        <RenderAccommodations />
      </Container>
    </div>
  );
}

export default Accommodations;
