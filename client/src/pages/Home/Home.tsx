import React from "react";
import { useNavigate } from "react-router-dom";
import { LOG_IN } from "../../components/services/constants";

const Home = () => {
  const navigate = useNavigate();

  const logout=()=>{
    localStorage.clear()
    navigate(LOG_IN)
  }

  return (
    <div>
      <h2>Home</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
