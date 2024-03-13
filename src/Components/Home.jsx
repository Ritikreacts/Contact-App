import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Action from "./Action";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userDetails = location.state ? location.state.data : null;
  const dataToSend = userDetails;

  useEffect(() => {
    if (!sessionStorage.getItem("activeUserId")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <Action data={dataToSend}></Action>
      <Outlet></Outlet>
    </>
  );
};

export default Home;
