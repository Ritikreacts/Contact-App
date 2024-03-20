import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Action from "../Components/Action";
import { getCookie } from "../Services/storage";

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = getCookie();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Navbar></Navbar>
      <Action></Action>
      <Outlet></Outlet>
    </>
  );
};

export default Home;
