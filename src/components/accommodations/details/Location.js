import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Location(props) {
  const defaultProps = {
    center: {
      lat: props.latitude,
      lng: props.longitude,
    },
    zoom: 11,
  };

  return (
    <div style={{ height: "320px", width: "350px" }} className={"details__map"}>
      <GoogleMapReact bootstrapURLKeys={{ key: "AIzaSyB470ELeGCSANQpmIBA3JNtcJVP2OvZARo" }} defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom} yesIWantToUseGoogleMapApiInternals>
        <AnyReactComponent lat={defaultProps.center.lat} lng={defaultProps.center.lng} text={<i class="fas fa-map-marker-alt"></i>} />
      </GoogleMapReact>
    </div>
  );
}
