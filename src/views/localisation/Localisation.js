import React, { useEffect } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { connect } from "react-redux";
import { loadEmergencies } from "src/store/reducers/emergencies";

const mapAPIkey = process.env.REACT_APP_MAP_API_KEY;
const Localisation = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${mapAPIkey}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    isMarkerShown: true,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const [location, setLocation] = React.useState({
    lat: -34.397,
    lng: 150.644,
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
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: location.lat, lng: location.lng }}
    >
      {props.isMarkerShown && (
        <Marker position={{ lat: location.lat, lng: location.lng }} />
      )}
    </GoogleMap>
  );
});

const mapStateToProps = (state) => {
  return {
    emergencies: state.emergencies.list,
  };
};

const mapDispatchToProps = {
  loadEmergencies: () => loadEmergencies(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Localisation);
