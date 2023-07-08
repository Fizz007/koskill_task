import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { userAuth } from "./Auth";
import { toast } from "react-toastify";
import { baseURL } from "../config/BaseURL";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = useContext(userAuth);

  const [cname, setCname] = useState("");
  const [cemail, setCemail] = useState("");
  const [cpass, setCpass] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [info, setInfo] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/user/signin`, {
        email,
        password,
      });

      console.log("Response:", response.data);    
      setEmail("");
      setPassword(""); 
      navigate('/home')
      auth.login();   
      toast.success("Login Succesful",{
        position: toast.POSITION.TOP_RIGHT,}
      )
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleCustomerData = async(e) => {
    e.preventDefault();
    const register = {cname, cemail, cpass, phone, address, info};
    console.log(register)
    try {
        const response = await axios.post(`${baseURL}/customer`, {
          name:cname,
          email:cemail,
          password:cpass,
          phoneNumber:phone,
          address:address,
          additionalInfo:info
        } )
       
        console.log("Response:", response.data); 
        setCname("");   
        setCemail("");
        setCpass(""); 
        setPhone("");
        setAddress("");
        setInfo("");
        toast.success("Data Stored",{
          position: toast.POSITION.TOP_RIGHT,
          }
        )
    }
      catch (error) {
      console.error("Error", error);
    }

  }

  function moveToRegister() {
    navigate("/signup");
  }
  return (
    <div className="head_wrapper">

        {/* Admin  */}

      <div className="wrapper">
        <h1>Admin Login</h1>
        <p>Welcome back you've been missed!</p>
        <form onSubmit={handleSignIn}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        <button type="submit">Sign in</button>
        </form>


        <div className="not-member">
          Not a member? <span onClick={moveToRegister}>Register Now</span>
        </div>
      </div>

      {/* Customer Signup */}
      <div className="wrapper">
        <h1>Customer Registeration</h1>
        <p>Welcome back you've been missed!</p>
        <form onSubmit={handleCustomerData}>
          <input
            type="text"
            value={cname}
            onChange={(e) => setCname(e.target.value)}
            placeholder="Enter username"
          />
          <input
            type="email"
            value={cemail}
            onChange={(e) => setCemail(e.target.value)}
            placeholder="Enter Email"
          />
          <input
            type="password"
            value={cpass}
            onChange={(e) => setCpass(e.target.value)}
            placeholder="Password"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />

          <input
          type="text"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            placeholder="Additional Info"           
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
