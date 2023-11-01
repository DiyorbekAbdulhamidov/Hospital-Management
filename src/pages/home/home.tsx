import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.scss";

interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = () => {
  const navigate = useNavigate();

  return (
    <section className="homePage">
      <div className="bottom">
        <h1>
          We are ready to <br /> help your health <br /> problems
        </h1>
        <p>
          Your one-stop destination for credible medical information and expert{" "}
          <br /> insights. Explore, learn, and take control of your health with
          us.
        </p>
        <div className="btns">
          <button onClick={() => navigate("/auth/login")}>Sign In</button>
          <button onClick={() => navigate("/auth/register")}>Sign Up</button>
        </div>
      </div>
    </section>
  );
};

export default Home;
