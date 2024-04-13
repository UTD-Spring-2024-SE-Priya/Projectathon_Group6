// SignUpPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import './SignUpPage.css';
import bg from './bg.png';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const navigate = useNavigate(); // For navigation after form submission
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (password !== reEnterPassword) {
        alert("Passwords don't match.");
        return;
      }
      try {
        // Replace with the actual backend endpoint
        const response = await fetch('YOUR_BACKEND_ENDPOINT/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });
        if (response.ok) {
          // Navigate to the editProfile page
            navigate('/editProfile');   
        } else {
          // Handle errors here
          //alert('Failed to create account');

          navigate('/editProfile');   //RN JUST MAKE IT NAVIAGTE, CAN CHANGE LATER ONCE INTERGRATING 
        }
      } catch (error) {
        // Handle network errors here
        alert('Network error');
      }
    };

    return (
        <div className="signup-container" style={{ backgroundImage: `url(${bg})` }}>
          <div className="signup-form">
            <h2>Create your <span id="highlightP">projectathon</span> account !</h2>
            <form onSubmit={handleSubmit}> {/* Add the handleSubmit here */}
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // Update the state when the input changes
                />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Re-Enter Password"
                  required
                  value={reEnterPassword}
                  onChange={(e) => setReEnterPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="submit-btn">Create Account</button>
            </form>
            <div className="divider">or</div>
            <div className="with"> sign up with </div>
            <div className="social-login">
              <button className="social-btn facebook">Facebook</button>
              <button className="social-btn google">Google</button>
              <button className="social-btn apple">Apple</button>
            </div>
            <div className="login-link">
              Already have an account? <Link to="/login">login here</Link>
            </div>
          </div>
        </div>
      );
    }
    
    export default SignUpPage;