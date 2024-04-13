// EditProfilePage.js
import React, { useState } from 'react';
import './EditProfilePage.css'; // Make sure to create this CSS file
import { useNavigate } from 'react-router-dom';

const EditProfilePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    skillLevel: '',
    programmingLanguages: [],
    interests: [],
    otherInterests: ''
  });

  const handleToggleSkillLevel = (level) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      skillLevel: prevFormData.skillLevel === level ? '' : level
    }));
  };

  const handleToggleLanguage = (language) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      programmingLanguages: prevFormData.programmingLanguages.includes(language)
        ? prevFormData.programmingLanguages.filter(l => l !== language)
        : [...prevFormData.programmingLanguages, language]
    }));
  };

  const handleToggleInterest = (interest) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      interests: prevFormData.interests.includes(interest)
        ? prevFormData.interests.filter(i => i !== interest)
        : [...prevFormData.interests, interest]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic here
    navigate('/profile');
  };

  return (
    <div className="edit-profile-container">
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <h2>Enter the following information to create or edit your profile.</h2>
        <label htmlFor="username">Username</label>
        <input 
          type="text" 
          id="username" 
          name="username"
          value={formData.username}
          required 
        />
        {/* Skill Level Selection */}
        <fieldset>
          <legend>Select Skill Level *only select one level</legend>
          <div className="button-group">
            {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map(level => (
              <button
                key={level}
                type="button"
                className={`toggle-btn ${formData.skillLevel === level ? 'active' : ''}`}
                onClick={() => handleToggleSkillLevel(level)}
              >
                {level}
              </button>
            ))}
          </div>
        </fieldset>
        
        {/* Programming Languages Selection */}
        <fieldset>
          <legend>Select Programming Languages</legend>
          <div className="button-group">
            {['C++', 'Java', 'HTML', 'CSS', 'Python', 'JavaScript', 'Swift', 'SQL', 'Ruby', 'Rust', 'Go', 'TypeScript'].map(language => (
              <button
                key={language}
                type="button"
                className={`toggle-btn ${formData.programmingLanguages.includes(language) ? 'active' : ''}`}
                onClick={() => handleToggleLanguage(language)}
              >
                {language}
              </button>
            ))}
          </div>
        </fieldset>
        
        {/* Interests Selection */}
        <fieldset>
          <legend>Select Interests</legend>
          <div className="button-group">
            {['AI/ML', 'Finance', 'Web Dev', 'VR/AR', 'Games', 'Sports', 'Cloud', 'Education', 'Security', 'Fashion', 'Robotics', 'Big Data'].map(interest => (
              <button
                key={interest}
                type="button"
                className={`toggle-btn ${formData.interests.includes(interest) ? 'active' : ''}`}
                onClick={() => handleToggleInterest(interest)}
              >
                {interest}
              </button>
            ))}
          </div>
        </fieldset>
        
        {/* ... */}
        
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default EditProfilePage;
