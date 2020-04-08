import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { Button, InfoBox } from "../components/MapComponents";
import Marker from "../components/Marker";
import "../styles/Map.css";

const Map = () => {
  const mapDefaults = {
    center: { lat: 45.4, lng: -75.7 },
    zoom: 16
  };

  const [newPosition, setNewPosition] = useState({
    center: { lat: 45.4, lng: -75.7 }
  });
  const [address, setAddress] = useState();
  const [isLocatitonFound, setIsLocationFound] = useState(false);
  const [didLocationUpdate, setDidLocationUpdate] = useState(false);

  useEffect(() => {
    const getExactAddress = () => {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newPosition.center.lat},${newPosition.center.lng}&key=${process.env.REACT_APP_MAP_API_KEY}`
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          setAddress(data.results[0].formatted_address);
          setDidLocationUpdate(true);
        });
    };
    getExactAddress();
  }, [newPosition]);

  const handleClick = () => {
    setIsLocationFound(false);
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        setIsLocationFound(true);
      }
    };

    const showPosition = position => {
      setNewPosition({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });
    };
    getUserLocation();
  };

  return (
    <div className="container mapContainer">
      <Button handleClick={handleClick} />
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={mapDefaults.center}
        defaultZoom={mapDefaults.zoom}
        zoom={mapDefaults.zoom}
        center={newPosition.center}
        distanceToMouse={() => {}}
      >
        <Marker
          lat={newPosition.center.lat}
          lng={newPosition.center.lng}
          found={isLocatitonFound}
        />

        <InfoBox
          address={address}
          found={isLocatitonFound}
          didLocationUpdate={didLocationUpdate}
        />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
