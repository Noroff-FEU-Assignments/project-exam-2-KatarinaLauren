import React from "react";
import { getFromStorage } from "../../utilities/localStorage/localStorageFunctions";
import AccommodationItem from "./AccommodationItem";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { BaseUrl } from "../../constants/api";
import Filters from "./Filters";

const url = BaseUrl;

class RenderAccommodation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      facilitiesFilter: {},
      items: [],
      availableFilters: [],
    };

    this.filterBooking = this.filterBooking.bind(this);
    this.filterChange = this.filterChange.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
  }

  componentDidMount() {
    const accommodations = getFromStorage();
    if (accommodations.length > 0) {
      const facilities = accommodations[0].facilities;
      const facilityNames = Object.keys(facilities);
      facilityNames.shift();

      this.setState({
        isLoaded: true,
        items: accommodations,
        availableFilters: facilityNames,
      });
    }

    if (accommodations.length === 0) {
      this.setState({
        isLoaded: true,
        error: "An error occurred",
      });
    }
  }

  resetFilters() {
    this.setState({
      facilitiesFilter: {},
    });
  }

  filterChange(e) {
    this.setState({ [e.target.name]: e.target.checked });

    let facilitiesList = this.state.facilitiesFilter;
    facilitiesList[e.target.name] = e.target.checked;

    this.setState({
      facilitiesFilter: facilitiesList,
    });
  }

  filterBooking(item) {
    for (var i in this.state.facilitiesFilter) {
      let filterState = this.state.facilitiesFilter[i];
      let facilityState = item.facilities[i];

      if (filterState === true) {
        if (filterState !== facilityState) {
          return false;
        }
      }
    }

    return true;
  }

  render() {
    const { error, isLoaded, items, availableFilters } = this.state;
    if (error) {
      return (
        <div>
          <Alert variant="danger">{error}</Alert>
        </div>
      );
    } else if (!isLoaded) {
      return <Spinner animation="border" variant="primary" />;
    } else {
      return (
        <Container className={"d-flex flex-column flex-lg-row justify-content-evenly mt-4"}>
          <Filters filterValues={availableFilters} changeFunction={this.filterChange} resetFunction={this.resetFilters} />
          <div className={"flex-grow-1"}>
            {items

              .filter((item) => this.filterBooking(item))
              .map(function (item) {
                const imageUrl = item.images[0].url;
                const image = url + imageUrl;
                const { id, name, location, room_rate } = item;
                return <AccommodationItem key={id} id={id} name={name} location={location} rate={room_rate} image={image} />;
              })}
          </div>
        </Container>
      );
    }
  }
}

export default RenderAccommodation;
