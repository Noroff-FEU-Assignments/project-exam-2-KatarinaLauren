import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Location(props) {
  let latitude = props.latitude;
  let longitude = props.longitude;

  const defaultProps = {
    center: {
      lat: latitude,
      lng: longitude,
    },
    zoom: 11,
  };

  return (
    <div className={"details__map"}>
      <GoogleMapReact bootstrapURLKeys={{ key: "AIzaSyB470ELeGCSANQpmIBA3JNtcJVP2OvZARo" }} defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom} yesIWantToUseGoogleMapApiInternals>
        <AnyReactComponent lat={defaultProps.center.lat} lng={defaultProps.center.lng} text={<i className="fas fa-map-marker-alt"></i>} />
      </GoogleMapReact>
    </div>
  );
}
