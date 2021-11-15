import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => (
  <div
    style={{
      color: "#dc3545",
      paddingBottom: "1em",
      fontSize: "2em",
    }}
  >
    {text}
  </div>
);

export default function Location(props) {
  const defaultProps = {
    center: {
      lat: props.latitude,
      lng: props.longitude,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "320px", width: "100%" }}>
      <GoogleMapReact bootstrapURLKeys={{ key: "AIzaSyB470ELeGCSANQpmIBA3JNtcJVP2OvZARo" }} defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom} yesIWantToUseGoogleMapApiInternals>
        <AnyReactComponent lat={defaultProps.center.lat} lng={defaultProps.center.lng} text={<i class="fas fa-map-marker-alt"></i>} />
      </GoogleMapReact>
    </div>
  );
}
