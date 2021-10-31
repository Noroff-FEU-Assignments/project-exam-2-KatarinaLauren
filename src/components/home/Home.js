import Heading from "../layout/Heading";
import Hero from "../layout/Hero";
import heroImage from "../../images/home.jpg";
import Button from "react-bootstrap/Button";

function Home() {
  return (
    <div>
      <Hero image={heroImage}>
        <Heading color={"#fff"} className={"d-inline"}>
          Visiting
        </Heading>
        <Heading color={"#FFC96C"} className={"d-inline ms-2"}>
          Bergen?
          <Button variant="success" className="d-block m-auto mt-5" size="lg">
            Book a room
          </Button>
        </Heading>
      </Hero>
    </div>
  );
}

export default Home;
