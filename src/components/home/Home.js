import Heading from "../layout/Heading";
import Hero from "../layout/Hero";
import heroImage from "../../images/home.jpg";

function Home() {
  return (
    <div>
      <Hero image={heroImage} alt={"Bergen"}>
        <Heading color={"#000"} fontSize={"3rem"} className={"d-inline"}>
          Visiting
        </Heading>
        <Heading color={"#FFC96C"} fontSize={"3rem"} className={"d-inline ms-2"}>
          Bergen?
        </Heading>
      </Hero>
    </div>
  );
}

export default Home;
