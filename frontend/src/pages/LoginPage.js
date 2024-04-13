import React from 'react';
import './LoginPage.css'; // Adjust your CSS file accordingly
import bg2 from './bg2.png'; // Make sure bg2.png is in the correct folder
import { Link } from 'react-router-dom';

const LoginPage = () => {
  // Add your login form submission logic here

  return (
    <div className="login-container" style={{ backgroundImage: `url(${bg2})` }}>
      <div className="login-form">
        <h2> <span id="highlightB"> Log in </span> to your account!</h2>
        <form>
          <div className="input-group-login">
            <input type="text" placeholder="Username" required />
          </div>
          <div className="input-group-login">
            <input type="password" placeholder="Password" required />
          </div>
          <div className="remember-me">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember me</label>
            <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
          </div>
          <button type="submit" className="submit-btn-login">Login</button> {/* Changed type from 'submit-login' to 'submit' */}
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
      </div> {/* Ensure this closing tag is present */}
    </div> // Ensure this closing tag is present
  );
}

export default LoginPage;
