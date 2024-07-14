import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import LocationOnIcon from '@mui/icons-material/LocationOn';
function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 46,
    longitude: 17,
    zoom: 4,
  });

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={2.294694} latitude={48.858093} offsetLeft={-20} offsetTop={-10}>
          <LocationOnIcon style={{fontSize:viewport.zoom*7,color:"slateblue"}}/>
        </Marker>
      </ReactMapGL>
    </div>
  );
}

export default App;
