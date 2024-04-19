import React from "react";
import "./LoginPage.css"; // Adjust your CSS file accordingly
import bg2 from "./bg2.png"; // Make sure bg2.png is in the correct folder
import { Link } from "react-router-dom";
import { serverUrl } from "../constants";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../state/userContext";

const LoginPage = () => {
  const navigate = useNavigate();

  const { setUserId } = useContext(UserContext);

  async function submitHandler(e) {
    e.preventDefault();

    const form = e.target;

    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    try {
      const response = await fetch(`${serverUrl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();

        const userId = data.id;

        setUserId(userId);
        console.log(`Set user id context to ${userId}`);

        // get userinfo from response
        const userInfoResponse = await fetch(
          `${serverUrl}/userInfo/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // If the response is successful, navigate to the profile page
        if (userInfoResponse.ok) {
          const userInfo = await userInfoResponse.json();

          console.log(`Found user info: ${JSON.stringify(userInfo)}`);

          const stateToPass = {
            username: userInfo.username,
            skillLevel: userInfo.skills[0],
            languages: userInfo.programmingLanguages,
            interests: userInfo.interests,
          };

          console.log(
            `Navigating to profile with state: ${JSON.stringify(stateToPass)}`
          );

          navigate("/profile", { state: { userInfo: stateToPass } });
        } else {
          // Navigate to the editProfile page
          navigate("/editProfile");
        }
      } else if (response.status === 404) {
        alert("User not found");
      } else {
        // Handle errors here
        alert("Failed to login");

        // navigate("/editProfile"); //RN JUST MAKE IT NAVIAGTE, CAN CHANGE LATER ONCE INTERGRATING
      }
    } catch (error) {
      // Handle network errors here
      alert("Network error");
    }
  }

  return (
    <div className="login-container" style={{ backgroundImage: `url(${bg2})` }}>
      <div className="login-form">
        <h2>
          {" "}
          <span id="highlightB"> Log in </span> to your account!
        </h2>
        <form onSubmit={submitHandler}>
          <div className="input-group-login">
            <input type="email" placeholder="Email" required />
          </div>
          <div className="input-group-login">
            <input type="password" placeholder="Password" required />
          </div>
          <div className="remember-me">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember me</label>
            <a href="/forgot-password" className="forgot-password">
              Forgot Password?
            </a>
          </div>
          <button type="submit" className="submit-btn-login">
            Login
          </button>{" "}
          {/* Changed type from 'submit-login' to 'submit' */}
        </form>
        <div className="divider">or</div>
        <div className="with"> login with </div>
        <div className="social-login">
          <button className="social-btn facebook">Facebook</button>
          <button className="social-btn google">Google</button>
          <button className="social-btn apple">Apple</button>
        </div>
        <div className="signup-link">
          Don’t have an account? <Link to="/">create one here</Link>
        </div>
      </div>{" "}
      {/* Ensure this closing tag is present */}
    </div> // Ensure this closing tag is present
  );
};

export default LoginPage;
