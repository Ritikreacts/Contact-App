import React from "react";
import Navbar from "../Components/Navbar";
import HomeContent from "../Components/HomeContent";
import { Outlet, useLocation, useNavigate, useOutlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Action from "./Action";

const EmailParser = (data) => {
  const [email, setEmail] = useState(data);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const match = email.match(/^([A-Za-z]+)/);
    if (match) {
      setUsername(match[1]);
    }
  }, [email]);
  return username;
};
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const location = useLocation();
  if (location.state) {
    const userDetails = location.state.data;
    const username = EmailParser(userDetails.email);

    return (
      <>
        <Navbar name={username}></Navbar>
        <Action></Action>
        <Outlet></Outlet>
      </>
    );
  }
};

export default Home;
