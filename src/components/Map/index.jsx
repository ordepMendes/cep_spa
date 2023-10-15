import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

function Map({ coordinate }) {
  const apiKey = process.env.REACT_APP_API_KEY;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });
  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: "80%", height: "600px" }}
          center={coordinate}
          zoom={15}
        >
          <Marker position={coordinate} />
        </GoogleMap>
      )}
    </>
  );
}

export default Map;
