import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";
import Layout from "./components/Layout";
import {
  ABOUT_US,
  HOME,
  LOG_IN,
  SIGN_UP,
} from "./components/services/constants";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import LogIn from "./pages/LogIn/LogIn";
import { PrivateOutletProps } from "./types";

const PrivateOutlet = ({
  isAuthProtected,
  Component,
  Layout,
}: PrivateOutletProps) => {
  let location = useLocation();
  if (isAuthProtected && !localStorage.getItem("authUser")) {
    return <Navigate to={LOG_IN} />;
  } else if (
    !isAuthProtected &&
    (location.pathname === LOG_IN || location.pathname === SIGN_UP) &&
    localStorage.getItem("authUser")
  ) {
    return <Navigate to={HOME} />;
  } else
    return (
      <Layout>
        <Component />
      </Layout>
    );
};

const App = () => {
  return (
    //authentication routes
    <Routes>
      <Route
        path={SIGN_UP}
        element={
          <PrivateOutlet
            Component={SignUp}
            Layout={Layout}
            isAuthProtected={false}
          />
        }
      />

      <Route
        path={LOG_IN}
        element={
          <PrivateOutlet
            Component={LogIn}
            Layout={Layout}
            isAuthProtected={false}
          />
        }
      />

      {/* protected routes */}
      <Route
        path={HOME}
        element={
          <PrivateOutlet
            Component={Home}
            Layout={Layout}
            isAuthProtected={true}
          />
        }
      />

      {/* public routes */}

      <Route
        path={ABOUT_US}
        element={
          <PrivateOutlet
            Component={AboutUs}
            Layout={Layout}
            isAuthProtected={false}
          />
        }
      />
    </Routes>
  );
};

export default App;
