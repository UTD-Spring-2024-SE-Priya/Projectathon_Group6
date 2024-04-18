import React from 'react';
import { useLocation } from 'react-router-dom'; // useLocation instead of useNavigate for this scenario
import './ProfilePage.css'; // Assuming you have or will create the corresponding CSS
import newProjectImage from './newProjectIMG.png';
import collectionsImage from './collectionsIMG.png';
import { useNavigate } from 'react-router-dom';


const ProfilePage = () => {
    const location = useLocation();
    const { userInfo } = location.state || {}; // Getting userInfo from the navigate state
    // Functions to handle the click events
    // Handler to navigate to the collection of project ideas

    // React Router hook for navigation
    // React Router navigate function
  const navigate = useNavigate();

  // Handler for navigating to the Edit Profile page
  const handleEditProfile = () => {
    navigate('/editProfile'); 
  };

  // Handler for logout logic
  const handleLogout = () => {
    navigate('/login');
  };

    const handleViewCollection = () => {
      navigate('/collection'); // Navigate to the route for collection
  };

  // Handler to navigate to the new project ideas
  const handleViewNewProjects = () => {
      navigate('/projectIdeas'); // Navigate to the route for new projects
  };

    return (
        <div>
            {/* Top bar with welcome message */}
            <div className="top-bar"> 
              <div className='welcome'> Welcome to Projectathon, <span id = "highlightLP"> {userInfo?.username} </span> </div>
            </div>

            {/* Skill Level */}
            <div className="profile-section">
              <h2> Skill Level</h2> <p>{userInfo?.skillLevel}</p></div>

            {/* Programming Languages */}
            <div className="profile-section"> <h2>Programming Languages</h2> <p> {userInfo?.languages.join(', ')} </p></div>

            {/* Interests */}
            <div className="profile-section"><h2>Interests</h2> <p>{userInfo?.interests.join(', ')}</p></div>

            <hr className="divider" />

            {/* Collection of project ideas */}
            <div className="profile-section">
                <h3>View your <span id="highlightBl">collection</span> of project ideas by clicking the button below</h3>
                <button onClick={handleViewCollection} className="image-button">
                    <img src={collectionsImage} alt="View Collections" />
                </button>
            </div>

            {/* New project ideas */}
            <div className="profile-section">
                <h3>View your <span id="highlightBl">new project ideas</span> by clicking the button below</h3>
                <button onClick={handleViewNewProjects} className="image-button">
                    <img src={newProjectImage} alt="View New Projects" />
                </button>
            </div>

            {/* Edit Profile and Logout buttons */}
            <div className="profile-actions">
            <button className="edit-profile-btn" onClick={handleEditProfile}>
              Edit Profile
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
            </div>
        </div>
    );
};

export default ProfilePage;
