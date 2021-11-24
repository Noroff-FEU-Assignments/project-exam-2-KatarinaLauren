import PageHeading from "../layout/PageHeading";
import { Link } from "react-router-dom";
import Hero from "../layout/Hero";
import heroImage from "../../images/home.jpg";
import Button from "react-bootstrap/Button";
import Paragraph from "../layout/Paragraph";
import SearchBar from "../searchBar/SearchBar";
import InspirationCards from "./InspirationCards";
import Container from "react-bootstrap/Container";
import AccommodationOverview from "./AccommodationOverview";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { accommodationKey } from "../../constants/keys";
import { getFromStorage } from "../../utilities/localStorage/localStorageFunctions";

// let accItems = getFromStorage(accommodationKey);

function Home() {
  const [items, setItems] = useState(getFromStorage(accommodationKey));

  let history = useHistory();

  const handleOnSelect = (item) => {
    // console.log(item.id);
    const route = `/detail/${item.id}`;
    setTimeout(() => {
      history.push(route);
    }, 1000);
    // history.push(route);
  };

  useEffect(() => {
    setItems(getFromStorage(accommodationKey));
  }, [setItems]);

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
      <div className={"home__div"}>
        <Paragraph color={"#02A6B5"} className={"text-center p-4 mb-1 home__div__paragraph"}>
          Find your ideal accommodation in and around the city
        </Paragraph>
        <SearchBar onSelect={handleOnSelect} items={items} />
      </div>
      <Container>
        <h3 className="mt-5 mb-4">INSPIRATION</h3>
        <InspirationCards />
        <h3 className="mt-5 mb-4">ACCOMMODATIONS</h3>
        <AccommodationOverview />
      </Container>
    </div>
  );
}

export default Home;
