const getGeoCoordinates = () => {
  // Geolocation is available
  const location = navigator.geolocation.getCurrentPosition(
    (position) => {
      return position.coords;
    },
    (error) => {
      console.error("Error getting location:", error);
    }
  );
  return location;
};

export { getGeoCoordinates };
