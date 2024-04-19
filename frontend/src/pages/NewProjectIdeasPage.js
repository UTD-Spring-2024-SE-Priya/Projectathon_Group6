import React from "react";
import "./NewProjectIdeasPage.css"; // make sure to create this CSS file
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory

const NewProjectIdeasPage = () => {
  // Define your project ideas in an array or fetch them from an API
  const navigate = useNavigate();
  const projectIdeas = [
    {
      title: "Fashion Marketplace",
      description:
        "Build an online marketplace where independent fashion designers can showcase and sell their creations. Use HTML and CSS to design a visually appealing storefront for each designer. Implement backend functionality using Python for product listings, transactions, and user management. Use Java for features like customer reviews, wishlist management, and notifications.",
      technologies: ["HTML", "CSS", "JavaScript", "Python"],
      // ... other details
    },
    {
      title: "Fashion Marketplace",
      description:
        "Build an online marketplace where independent fashion designers can showcase and sell their creations. Use HTML and CSS to design a visually appealing storefront for each designer. Implement backend functionality using Python for product listings, transactions, and user management. Use Java for features like customer reviews, wishlist management, and notifications.",
      technologies: ["HTML", "CSS", "JavaScript", "Python"],
      // ... other details
    },
    {
      title: "Fashion Marketplace",
      description:
        "Build an online marketplace where independent fashion designers can showcase and sell their creations. Use HTML and CSS to design a visually appealing storefront for each designer. Implement backend functionality using Python for product listings, transactions, and user management. Use Java for features like customer reviews, wishlist management, and notifications.",
      technologies: ["HTML", "CSS", "JavaScript", "Python"],
      // ... other details
    },
    {
      title: "Fashion Marketplace",
      description:
        "Build an online marketplace where independent fashion designers can showcase and sell their creations. Use HTML and CSS to design a visually appealing storefront for each designer. Implement backend functionality using Python for product listings, transactions, and user management. Use Java for features like customer reviews, wishlist management, and notifications.",
      technologies: ["HTML", "CSS", "JavaScript", "Python"],
      // ... other details
    },
    {
      title: "Fashion Marketplace",
      description:
        "Build an online marketplace where independent fashion designers can showcase and sell their creations. Use HTML and CSS to design a visually appealing storefront for each designer. Implement backend functionality using Python for product listings, transactions, and user management. Use Java for features like customer reviews, wishlist management, and notifications.",
      technologies: ["HTML", "CSS", "JavaScript", "Python"],
      // ... other details
    },
    {
      title: "Fashion Marketplace",
      description:
        "Build an online marketplace where independent fashion designers can showcase and sell their creations. Use HTML and CSS to design a visually appealing storefront for each designer. Implement backend functionality using Python for product listings, transactions, and user management. Use Java for features like customer reviews, wishlist management, and notifications.",
      technologies: ["HTML", "CSS", "JavaScript", "Python"],
      // ... other details
    },
    // ... more project ideas
  ];

  const [likes, setLikes] = useState({}); // Initialize state to keep track of likes for each project

  const handleLike = (index) => {
    // handle like action, rn just have it show that the project was liked
    console.log(`Liked project ${index}`);

    //change it
    setLikes((prevLikes) => ({
      ...prevLikes,
      [index]: !prevLikes[index], // Toggle like status
    }));

    //add the project to collections
  };

  const handleComment = (index) => {
    // Logic for handling a comment action on the project at the given index
    console.log(`Comment on project ${index}`);
    navigate(`/feedback/${index}`);
  };

  return (
    <div>
      <div className="top-bar">
        <div className="bar-title">Projectathon</div>
        <nav className="nav-links">
          <Link to="/projectIdeas">Ideas</Link>
          <Link to="/collections">Collections</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </div>
      <button className="generate-ideas-btn">
        Click here to generate new ideas!
      </button>
      <div className="new-project-ideas-page">
        <div className="project-grid">
          {projectIdeas.map((idea, index) => (
            <div key={index} className="project-card">
              <h2>{idea.title}</h2>
              <p>{idea.description}</p>
              <ul>
                {idea.technologies.map((tech, idx) => (
                  <li key={idx}>{tech}</li>
                ))}
              </ul>
              {/* Icons container */}
              <div className="icons-container">
                <button
                  className="icon-button"
                  onClick={() => handleLike(index)}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={`heart-icon ${likes[index] ? "liked" : ""}`}
                  />
                </button>
                <button
                  onClick={() => handleComment(index)}
                  className="icon-button"
                >
                  <FontAwesomeIcon
                    icon={faComment}
                    className="icon comment-icon"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewProjectIdeasPage;
