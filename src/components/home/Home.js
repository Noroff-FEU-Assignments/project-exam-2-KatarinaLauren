import PageHeading from "../layout/PageHeading";
import { Link } from "react-router-dom";
import Hero from "../layout/Hero";
import heroImage from "../../images/home.jpg";
import Button from "react-bootstrap/Button";
import Paragraph from "../layout/Paragraph";
import SearchBar from "../searchBar/SearchBar";
import InspirationCards from "./InspirationCards";
import Container from "react-bootstrap/Container";

function Home() {
  return (
    <div>
      <Hero image={heroImage}>
        <PageHeading color={"#fff"} className={"d-inline"}>
          Visiting
        </PageHeading>
        <PageHeading color={"#FFC96C"} className={"d-inline ms-2"}>
          Bergen?
        </PageHeading>
        <Link to="/booking" className="ms-3 nav-link">
          <Button variant="success" className="d-block m-auto mt-4" size="lg">
            Book a room
          </Button>
        </Link>
      </Hero>
      <Paragraph color={"#02A6B5"} bgColor={"#fff"} className={"text-center p-4 mb-4 home__paragraph"}>
        Find your ideal accommodation in and around the city
      </Paragraph>
      <SearchBar />
      <Container>
        <h3 className="mt-5 mb-4">INSPIRATION</h3>
        <InspirationCards cardLink="true" />
      </Container>
    </div>
  );
}

export default Home;
