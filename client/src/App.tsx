import React, { ElementType } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout";
import { ABOUT_US, HOME, SIGN_IN } from "./components/services/constants";
import LoginSignup from "./pages/authentication/LoginSignup";
import Home from "./pages/authenticated/Home";
import AboutUs from "./pages/unAuthenticatedRoutes/AboutUs";

interface PrivateOutletProps {
  isAuthProtected: boolean;
  Component: ElementType;
  Layout: ElementType;
}

const PrivateOutlet = ({
  isAuthProtected,
  Component,
  Layout,
}: PrivateOutletProps) => {
  if (isAuthProtected && !localStorage.getItem("authUser")) {
    return <Navigate to={SIGN_IN} />;
  }
  // else if (
  //   !isAuthProtected &&
  //   location.pathname === SIGN_IN &&
  //   localStorage.getItem("authUser")
  // ) {
  //   return <Navigate to={HOME} />;
  // }
  else
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
        path={SIGN_IN}
        element={
          <PrivateOutlet
            Component={LoginSignup}
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
