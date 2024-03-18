import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Action from "../Components/Action";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("activeUserId")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Navbar></Navbar>
      <Action></Action>
      <Outlet></Outlet>
    </>
  );
};

export default Home;
