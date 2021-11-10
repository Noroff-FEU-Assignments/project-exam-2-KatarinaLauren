import React from "react";
import { getFromStorage } from "../../utilities/localStorage/localStorageFunctions";
import AccommodationItem from "./AccommodationItem";
import Alert from "react-bootstrap/Alert";
import { BaseUrl } from "../../constants/api";
import Filter from "./Filter";

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
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Filter filterValues={availableFilters} changeFunction={this.filterChange} />
          {items

            .filter((item) => this.filterBooking(item))
            .map(function (item) {
              const imageUrl = item.images[0].url;
              const image = url + imageUrl;
              const { id, name, location, room_rate } = item;
              return <AccommodationItem key={id} id={id} name={name} location={location} rate={room_rate} image={image} />;
            })}
        </div>
      );
    }
  }
}

export default RenderAccommodation;
