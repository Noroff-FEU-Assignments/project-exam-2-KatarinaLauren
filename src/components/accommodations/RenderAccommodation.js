import React from "react";
import AccommodationItem from "./AccommodationItem";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { AccUrl } from "../../constants/api";
import Filters from "./Filters";
import { getFromStorage } from "../../utilities/localStorage/localStorageFunctions";
import { facilitiesKey } from "../../constants/keys";

class RenderAccommodation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      facilitiesFilter: {},
      items: [],
      availableFilters: getFromStorage(facilitiesKey),
    };

    this.filterBooking = this.filterBooking.bind(this);
    this.filterChange = this.filterChange.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
  }

  componentDidMount() {
    fetch(AccUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error: "An error occurred",
          });
        }
      );
  }

  filterChange(e) {
    if (e.target.name) {
      this.setState({ [e.target.name]: e.target.checked });

      let facilitiesList = this.state.facilitiesFilter;
      facilitiesList[e.target.name] = e.target.checked;

      this.setState({
        facilitiesFilter: facilitiesList,
      });
    }
  }

  resetFilters(e) {
    e.target.form.reset();
    this.setState({
      facilitiesFilter: {},
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
        <Container className={"d-flex flex-column flex-lg-row justify-content-enter justify-content-lg-evenly mt-4 mb-5"}>
          <Filters filterValues={availableFilters} changeFunction={this.filterChange} resetFunction={this.resetFilters} />
          <div className={"flex-grow-1"}>
            {items

              .filter((item) => this.filterBooking(item))
              .map(function (item) {
                const imageUrl = item.images[0].url;
                const { id, name, location, room_rate } = item;
                return <AccommodationItem key={id} id={id} name={name} location={location} rate={room_rate} image={imageUrl} />;
              })}
          </div>
        </Container>
      );
    }
  }
}

export default RenderAccommodation;
