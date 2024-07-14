import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import "./app.css"
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
        <Marker
          longitude={2.294694}
          latitude={48.858093}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <LocationOnIcon
            style={{ fontSize: viewport.zoom * 7, color: "slateblue" }}
          />
        </Marker>
      { /* <Popup longitude={2.294694} latitude={48.858093} anchor="left">
          <div className="card">
            <label>Place</label>
            <h4 className="place">Eifell Tower</h4>
            <label>Review</label>
            <p className="description">Beatifyl place, i like it</p>
            <label>Rating</label>
            <div className="stars">
              <StarIcon className="star" />
              <StarIcon className="star"/>
              <StarIcon className="star"/>
              <StarIcon className="star"/>
              <StarIcon className="star"/>
            </div>
            <label>Information</label>
            <span className="username">created by <b>halil</b></span>
            <span className="date">1 hour ago</span>

          </div>
        </Popup>*/}
      </ReactMapGL>
    </div>
  );
}

export default App;
