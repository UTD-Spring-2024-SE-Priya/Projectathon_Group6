import React from 'react';
import './NewProjectIdeasPage.css'; // make sure to create this CSS file
import { Link } from 'react-router-dom';

const NewProjectIdeasPage = () => {
  // Define your project ideas in an array or fetch them from an API
  const projectIdeas = [
    {
      title: 'Fashion Marketplace',
      description: 'Build an online marketplace where independent fashion designers can showcase and sell their creations. Use HTML and CSS to design a visually appealing storefront for each designer. Implement backend functionality using Python for product listings, transactions, and user management. Use Java for features like customer reviews, wishlist management, and notifications.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Python']
      // ... other details
    },
    // ... more project ideas
  ];

  return (
    <div>
        <div className="top-bar"> 
            <div className='bar-title'>Projectathon</div>
            <nav className="nav-links">
            <Link to="/ideas">Ideas</Link>
            <Link to="/collections">Collections</Link>
            <Link to="/profile">Profile</Link>
            </nav>
        </div>
        <button className="generate-ideas-btn">Click here to generate new ideas!</button>
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
                {/* Add more details as needed */}
            </div>
            ))}
        </div>
        </div>
    </div>
  );
};

export default NewProjectIdeasPage;
