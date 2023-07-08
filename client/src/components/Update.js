import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { baseURL } from "../config/BaseURL";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [info, setInfo] = useState("");
  const { id } = useParams();
  const navv = useNavigate();

  const getSingleData = async () => {
    const response = await axios.get(`${baseURL}/customer/${id}`);
    const result = response.data.user;
    console.log(result)
    if (response) {
      setName(result.name);
      setEmail(result.email);
      setPass(result.password);
      setPhone(result.phoneNumber);
      setAddress(result.address);
      setInfo(result.additionalInfo);
    }
  };

  //passing edited data to backend
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = { name, email, pass, phone, address, info };
    console.log(updatedUser);
    
    try {
      const response = await axios.patch(`${baseURL}/customer/${id}`, updatedUser);
      
      if (response.status === 200) {
        const result = response.data;
        console.log("updated result..", result);
        
        navv("/home");
      } else {
        console.log(response.error);
      }
    } catch (error) {
      
      console.error(error);
    }
  };
  

  useEffect(() => {
    getSingleData();
  }, []);

  return (
    <div className="update_wrapper">
        <div className="wrapper">
        <h1>Update Customer Details</h1>
        {/* <p>Welcome back you've been missed!</p> */}
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter username"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
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
          <textarea
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            placeholder="Additional Info"
            cols="40"
            rows="4"
          ></textarea>
          <button type="submit">Update</button>
        </form>
          </div>
    </div>
  );
};

export default Update;
