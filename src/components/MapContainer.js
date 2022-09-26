import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import React from "react";

function MapContainer({ google, lat = "41.9214", lng = "-88.0078" }) {
  return (
    <Map google={google}>
      <Marker name={"Current location"} position={{ lat: lat, lng: lng }} />
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCLUGsAfJ3KpGlJSiRxQnkoPeSWY9T5clE",
  libraries: ["places"],
})(MapContainer);
