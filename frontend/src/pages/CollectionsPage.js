import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./CollectionsPage.css"; // make sure this CSS file is prepared for collections page as well
import { UserContext } from "../state/userContext";
import { serverUrl } from "../constants";
import { useNavigate } from "react-router-dom";

const CollectionsPage = () => {
  // Hardcoded liked project ideas for now
  // const likedProjectIdeas = [
  //     {
  //         title: 'Fashion Marketplace',
  //         description: 'Build an online marketplace where independent fashion designers can showcase and sell their creations. Use HTML and CSS to design a visually appealing storefront for each designer. Implement backend functionality using Python for product listings, transactions, and user management. Use Java for features like customer reviews, wishlist management, and notifications.',
  //         technologies: ['HTML', 'CSS', 'JavaScript', 'Python']
  //     },
  //     {
  //         title: 'Fashion Marketplace',
  //         description: 'Build an online marketplace where independent fashion designers can showcase and sell their creations. Use HTML and CSS to design a visually appealing storefront for each designer. Implement backend functionality using Python for product listings, transactions, and user management. Use Java for features like customer reviews, wishlist management, and notifications.',
  //         technologies: ['HTML', 'CSS', 'JavaScript', 'Python']
  //     },
  //     {
  //         title: 'Fashion Marketplace',
  //         description: 'Build an online marketplace where independent fashion designers can showcase and sell their creations. Use HTML and CSS to design a visually appealing storefront for each designer. Implement backend functionality using Python for product listings, transactions, and user management. Use Java for features like customer reviews, wishlist management, and notifications.',
  //         technologies: ['HTML', 'CSS', 'JavaScript', 'Python']
  //     },
  //     {
  //         title: 'Fashion Marketplace',
  //         description: 'Build an online marketplace where independent fashion designers can showcase and sell their creations. Use HTML and CSS to design a visually appealing storefront for each designer. Implement backend functionality using Python for product listings, transactions, and user management. Use Java for features like customer reviews, wishlist management, and notifications.',
  //         technologies: ['HTML', 'CSS', 'JavaScript', 'Python']
  //     },
  //     {
  //         title: 'Fashion Marketplace',
  //         description: 'Build an oe and sell their creations. Use H a visually appealing storefront for each designer. Implement backend functionality using Python for product listings, transactions, and user management. Use Java for features like customer reviews, wishlist management, and notifications.',
  //         technologies: ['HTML', 'CSS', 'JavaScript', 'Python']
  //     },
  // ];
  const [likedProjectIdeas, setLikedProjectIdeas] = React.useState([]);

  const { userId } = useContext(UserContext);

  const navigate = useNavigate();

  async function fetchLikedProjects() {
    const response = await fetch(`${serverUrl}/collection/likedIdeas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    const data = await response.json();

    console.log(`fetched liked projects: ${JSON.stringify(data)}`);
    setLikedProjectIdeas(data);
  }

  useEffect(() => {
    if (!userId) {
      alert("Please log in to view your liked projects");
      navigate("/login");
    }

    console.log(`Fetching liked projects for user ${userId}`);

    fetchLikedProjects();
  }, []);

  return (
    <div>
      <div className="top-bar">
        <div className="bar-title">My Liked Projects</div>
        <nav className="nav-links">
          <Link to="/projectIdeas">Ideas</Link>
          <Link to="/collections">Collection</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </div>
      <div className="collections-page">
        <div className="project-gridLiked">
          {likedProjectIdeas.map((idea, index) => (
            <div key={index} className="project-card">
              <h2>{idea.title}</h2>
              <p>{idea.description}</p>
              <ul>
                {idea.technologies.map((tech, idx) => (
                  <li key={idx}>{tech}</li>
                ))}

                {/* {idea.technologies} */}
              </ul>
              <div className="icons-container">
                <button className="icon-button">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="heart-icon liked"
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

export default CollectionsPage;
