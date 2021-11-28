import PageHeading from "../layout/PageHeading";
import { Link } from "react-router-dom";
import Hero from "../layout/Hero";
import heroImage from "../../images/home.jpg";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Paragraph from "../layout/Paragraph";
import SearchBar from "../searchBar/SearchBar";
import InspirationCards from "./InspirationCards";
import AccommodationOverview from "./AccommodationOverview";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { AccUrl } from "../../constants/api";
import axios from "axios";

function Home() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  let history = useHistory();

  const handleOnSelect = (item) => {
    const route = `/detail/${item.id}`;
    setTimeout(() => {
      history.push(route);
    }, 500);
  };

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(AccUrl)
        .then((response) => {
          setItems(response.data);
        })
        .catch((error) => {
          console.log(error);
          setError("An error occurred while loading accommodation info");
        });
    };
    fetchData();
  }, [setItems]);

  return (
    <div className="home">
      <Hero image={heroImage}>
        <PageHeading color={"#fff"} className={"d-inline"}>
          Visiting
        </PageHeading>
        <PageHeading color={"#FFC96C"} className={"d-inline ms-2"}>
          Bergen?
        </PageHeading>
        <div className="mt-5">{error ? <div></div> : <SearchBar onSelect={handleOnSelect} items={items} />}</div>
      </Hero>
      <div className={"home__div"}>
        <Paragraph className={"text-center p-4 mb-1 home__div__paragraph"}>Find your ideal accommodation in and around the city</Paragraph>

        <Link to="/booking" className=" nav-link">
          <Button variant="success" className="d-block m-auto" size="lg">
            Book a room
          </Button>
        </Link>
      </div>
      <Container>
        <h3 className="mb-4 mt-5">INSPIRATION</h3>
        <div className="home__div mt-3 p-4">
          <InspirationCards />
        </div>

        <h3 className="mt-5 mb-4">ACCOMMODATIONS</h3>
        <AccommodationOverview />
      </Container>
    </div>
  );
}

export default Home;
