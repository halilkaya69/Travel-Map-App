import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import "./app.css";
import axios from "axios";
import { format } from "timeago.js";

function App() {
  const currentUser = "halil";
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 46,
    longitude: 17,
    zoom: 4,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleMarkerCLick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    //console.log(e);
    const [long, lat] = e.lngLat;
    setNewPlace({
      lat,
      long,
    });
  };

  const handleSubmit= async (e)=>{
    e.preventDefault();
    const newPin={
      username:currentUser,
      title,
      desc,
      rating,
      lat:newPlace.lat,
      long:newPlace.long,

    }

    try {
      const res= await axios.post("/pins",newPin);
      setPins([...pins,res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
      
    }
  }

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onDblClick={handleAddClick}
        transitionDuration="200"
      >
        {pins.map((p) => (
          <>
            <Marker
              longitude={p.long}
              latitude={p.lat}
              offsetLeft={-viewport.zoom*3.5}
              offsetTop={-viewport.zoom*7}
            >
              <LocationOnIcon
                style={{
                  fontSize: viewport.zoom * 7,
                  color: p.username === currentUser ? "tomato" : "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerCLick(p._id, p.lat, p.long)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                longitude={p.long}
                latitude={p.lat}
                anchor="left"
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="description">{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(<StarIcon className="star" />)}
                    
                  </div>
                  <label>Information</label>
                  <span className="username">
                    created by <b>{p.username}</b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace && (
          <Popup
            longitude={newPlace.long}
            latitude={newPlace.lat}
            closeButton={true}
            closeOnClick={false}
            anchor="left"
            onClose={() => setNewPlace(null)}
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  placeholder="enter a title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Review</label>
                <textarea
                  placeholder="say us something about this place"
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitButton" type="submit">
                  Add Pin
                </button>
              </form>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
