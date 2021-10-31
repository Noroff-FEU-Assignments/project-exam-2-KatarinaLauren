import Heading from "../layout/Heading";
import Hero from "../layout/Hero";
import heroImage from "../../images/home.jpg";
import Button from "react-bootstrap/Button";
import Paragraph from "../layout/Paragraph";
import SearchBar from "../searchBar/SearchBar";

function Home() {
  return (
    <div>
      <Hero image={heroImage}>
        <Heading color={"#fff"} className={"d-inline"}>
          Visiting
        </Heading>
        <Heading color={"#FFC96C"} className={"d-inline ms-2"}>
          Bergen?
        </Heading>
        <Button variant="success" className="d-block m-auto mt-4" size="lg">
          Book a room
        </Button>
      </Hero>
      <Paragraph color={"#343638"} bgColor={"#fff"} className={"text-center p-3 home__paragraph"}>
        Find your ideal accommodation in and around the city
      </Paragraph>
      <SearchBar />
    </div>
  );
}

export default Home;
