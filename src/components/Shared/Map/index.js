import React, { useRef, useEffect, useState, memo } from "react";
import { useGeolocated } from "react-geolocated";
import mapboxgl, { Marker } from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const LocationMap = ({ location }) => {
  console.log("====================================");
  console.log(location);
  console.log("====================================");
  const mapContainer = useRef();
  const [map, setMap] = useState(null);
  const [coordinates, setCoordinates] = useState({ longitude: 0, latitude: 0 });

  const markerRef = useRef(null);

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  useEffect(() => {
    if (location.lat === 0 && location.lng === 0 && coords) {
      coordinates.latitude = 0;
      coordinates.longitude = 0;
    }
    if (location.lat != 0 && location.lng != 0) {
      coordinates.latitude = location.lat;
      coordinates.longitude = location.lng;
    }

    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        accessToken:
          "pk.eyJ1IjoiYXN2ZHRoIiwiYSI6ImNscGtpbGpvczBib3oycWtleWw3NXB2aDYifQ.xHDXD6D8Dm9IDg_F27qEfQ",
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [coordinates.longitude, coordinates.latitude],
        zoom: 15,
      });
      map.on("load", async () => {
        setMap(map);
        map.resize();
        new Marker()
          .setLngLat([coordinates.longitude, coordinates.latitude])
          .addTo(map);
      });
    };
    if (!map) initializeMap({ setMap, mapContainer });
  }, [map, coords]);

  return (
    <>
      <div
        ref={(el) => (mapContainer.current = el)}
        style={{
          flex: 1,
          width: 500,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          height: "53.5vh",
        }}
      />
    </>
  );
};

export default memo(LocationMap);
