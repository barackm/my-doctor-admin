import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadEmergencies } from "src/store/reducers/emergencies";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
const mapAPIkey = process.env.REACT_APP_MAP_API_KEY;
const Localisation = (props) => {
  const [location, setLocation] = React.useState({
    lat: -1.9237381926607404,
    lng: 30.067231396903324,
  });
  useEffect(() => {
    props.loadEmergencies();
    const emergencyId = props.match.params.id;
    const emergency = props.emergencies.find((e) => e._id === emergencyId);
    if (!emergency) {
      return props.history.replace("/emergencies");
    }
    const { latitude, longitude } = emergency.location;
    setLocation({
      lat: latitude,
      lng: longitude,
    });
  }, []); // eslint-disable-line
  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: mapAPIkey,
  });

  // eslint-disable-next-line
  const [map, setMap] = React.useState(null);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location}
      zoom={30}
      onUnmount={onUnmount}
    >
      <>
        <Marker position={{ lat: location.lat, lng: location.lng }} />
      </>
    </GoogleMap>
  ) : (
    <></>
  );
};

const mapStateToProps = (state) => {
  return {
    emergencies: state.emergencies.list,
  };
};

const mapDispatchToProps = {
  loadEmergencies: () => loadEmergencies(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Localisation);
