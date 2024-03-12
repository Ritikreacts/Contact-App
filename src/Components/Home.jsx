import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import HomeContent from "../Components/HomeContent";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Action from "./Action";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const userDetails = location.state ? location.state.data : null;
  const username = userDetails ? userDetails.email.match(/^([A-Za-z]+)/)[1] : null;

  return (
    <>
      <Navbar name={username}></Navbar>
      <Action></Action>
      <Outlet></Outlet>
    </>
  );
};

export default Home;
