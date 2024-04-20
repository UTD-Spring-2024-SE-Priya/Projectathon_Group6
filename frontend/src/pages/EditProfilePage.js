// EditProfilePage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory
import "./EditProfilePage.css";
import { serverUrl } from "../constants";
import { useContext } from "react";
import { UserContext } from "../state/userContext";

const skillLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];
const programmingLanguages = [
  "C++",
  "Java",
  "HTML",
  "CSS",
  "Python",
  "JavaScript",
  "Swift",
  "SQL",
  "Ruby",
  "Rust",
  "Go",
  "TypeScript",
];
const interests = [
  "AI/ML",
  "Finance",
  "Web Dev",
  "VR/AR",
  "Games",
  "Sports",
  "Cloud",
  "Education",
  "Security",
  "Fashion",
  "Robotics",
  "Big Data",
];

const EditProfilePage = () => {
  const [username, setUsername] = useState("");
  const [otherInterests, setOtherInterests] = useState("");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);

  const userContext = useContext(UserContext);

  const navigate = useNavigate();

  const toggleLanguageSelection = (language) => {
    setSelectedLanguages((prevSelected) =>
      prevSelected.includes(language)
        ? prevSelected.filter((lang) => lang !== language)
        : [...prevSelected, language]
    );
  };

  const toggleInterestSelection = (interest) => {
    setSelectedInterests((prevSelected) =>
      prevSelected.includes(interest)
        ? prevSelected.filter((int) => int !== interest)
        : [...prevSelected, interest]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userInfo = {
      username,
      skillLevel: selectedSkillLevel,
      languages: selectedLanguages,
      interests: selectedInterests,
      otherInterests,
    };

    /*
        export type UpdateUserInfoInput = {
          userId: number;
          skills: string[];
          programmingLanguages: string[];
          interests: string[];
      }
        */

    try {
      const response = await fetch(`${serverUrl}/userInfo/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userContext.userId,
          skills: [userInfo.skillLevel],
          programmingLanguages: userInfo.languages,
          interests: userInfo.interests,
        }),
      });
      if (response.ok) {
        navigate("/profile", { state: { userInfo } });
      } else {
        // Handle errors here
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      // Handle network errors here
      alert("Network error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="top-bar"></div>
        <div className="edit-profile-container">
          <div className="title">
            Enter the following information to create or edit your{" "}
            <span id="highlightP">profile</span>.
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>
              Select <span id="highlightP">Skill Level</span>{" "}
            </label>
            <span id="seleteOne">*only select one level</span>
            <div className="skill-level">
              {skillLevels.map((level) => (
                <button
                  key={level}
                  type="button" // Prevent the form from submitting
                  onClick={() => setSelectedSkillLevel(level)}
                  className={selectedSkillLevel === level ? "active" : ""}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>
              Select <span id="highlightP"> Programming Languages </span>{" "}
            </label>
            <span id="seleteMant">*can select many</span>
            <div className="language-buttons">
              {programmingLanguages.map((language) => (
                <button
                  key={language}
                  type="button" // Prevent the form from submitting
                  onClick={() => toggleLanguageSelection(language)}
                  className={
                    selectedLanguages.includes(language) ? "active" : ""
                  }
                >
                  {language}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>
              Select <span id="highlightP"> Interests </span>{" "}
            </label>
            <span id="seleteMant">*can select many</span>
            <div className="interest-buttons">
              {interests.map((interest) => (
                <button
                  key={interest}
                  type="button" // Prevent the form from submitting
                  onClick={() => toggleInterestSelection(interest)}
                  className={
                    selectedInterests.includes(interest) ? "active" : ""
                  }
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>
              {" "}
              Enter other <span id="highlightP"> Interests </span>{" "}
            </label>
            <input
              type="text"
              value={otherInterests}
              onChange={(e) => setOtherInterests(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Submit" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditProfilePage;
