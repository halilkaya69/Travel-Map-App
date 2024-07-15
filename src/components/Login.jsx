import { useState,useRef } from "react";
import "./login.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";
import ClearIcon from '@mui/icons-material/Clear';

export default function Login({setShowLogin,myStorage,setCurrentUser}) {
  const [error, setError] = useState(false);
  const nameRef=useRef();
  const passwordRef=useRef();

 const handleSubmit = async (e)=>{
    e.preventDefault();
    const user={
        username:nameRef.current.value,
        password:passwordRef.current.value,
    };

    try {
        const res =await axios.post("/users/login",user);
        myStorage.setItem("user",res.data.username);
        setCurrentUser(res.data.username);
        setShowLogin(false);
        setError(false);
    } catch (err) {
        setError(true);        
    }
 };

  return (
    <div className="loginContainer">
      <div className="logo">
        <LocationOnIcon />
        Pin
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef}></input>
        <input type="password" placeholder="password" ref={passwordRef}></input>
        <button className="loginBtn">Login</button>

       
        {error && <span className="failure">something went wrong</span>}
      </form>
      <ClearIcon className="loginCancel" onClick={()=>setShowLogin(false)}/>
    </div>
  );
}
