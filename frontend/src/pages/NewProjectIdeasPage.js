import React, { useContext, useEffect } from "react";
import "./NewProjectIdeasPage.css"; // make sure to create this CSS file
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory
import { serverUrl } from "../constants";
import { UserContext } from "../state/userContext";

const NewProjectIdeasPage = () => {
  const navigate = useNavigate();

  const [projectIdeas, setProjectIdeas] = React.useState([]); // Initialize state to store project ideas

  const [likes, setLikes] = useState({}); // Initialize state to keep track of likes for each project

  const { userId } = useContext(UserContext);

  const [skillLevel, setSkillLevel] = useState("");
  const [interests, setInterests] = useState([]);
  const [languages, setLanguages] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [likedProjectIdeas, setLikedProjectIdeas] = React.useState([]);

  const handleLike = (index) => {
    // handle like action, rn just have it show that the project was liked
    console.log(`Liked project ${index}`);

    //change it
    setLikes((prevLikes) => ({
      ...prevLikes,
      [index]: !prevLikes[index], // Toggle like status
    }));

    //add the project to liked
    try {
      const projectIdea = projectIdeas[index];

      const response = fetch(`${serverUrl}/collection/addIdeaToLiked`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          ideaId: projectIdea.id,
        }),
      });

      if (response.ok) {
        console.log("Added project to liked collection");
      } else {
        console.error("Failed to add project to liked collection");
        // alert("Failed to add project to liked collection");
      }
    } catch (error) {
      console.error("Failed to add project to liked collection");
    }
  };

  const handleComment = (index) => {
    // Logic for handling a comment action on the project at the given index
    console.log(`Comment on project ${index}`);
    navigate(`/feedback/${index}`, {
      state: { ideaId: projectIdeas[index].id },
    });
  };

  async function fetchLikedProjects(projectIdeas) {
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

    const likedProjectIds = data.map((idea) => idea.id);

    console.log(`Liked project ids: ${likedProjectIds}`);

    console.log(`project ids: ${projectIdeas.map((idea) => idea.id)}`);

    const likes = projectIdeas.map((idea) => likedProjectIds.includes(idea.id));

    console.log(`Likes: ${likes}`);

    setLikes(likes);
  }

  async function fetchProjectIdeas() {
    const response = await fetch(`${serverUrl}/projectIdea/${userId}/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();

      console.log(`Fetched project ideas: ${JSON.stringify(data)}`);
      setProjectIdeas(data);

      await fetchLikedProjects(data);
    } else {
      alert("Failed to fetch project ideas");
    }
  }

  async function fetchUserInfo() {
    // get userinfo from response
    const userInfoResponse = await fetch(`${serverUrl}/userInfo/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // If the response is successful, navigate to the profile page
    if (userInfoResponse.ok) {
      const userInfo = await userInfoResponse.json();

      console.log(`Found user info: ${JSON.stringify(userInfo)}`);

      const state = {
        username: userInfo.username,
        skillLevel: userInfo.skills[0],
        languages: userInfo.programmingLanguages,
        interests: userInfo.interests,
      };

      setInterests(state.interests);
      setLanguages(state.languages);
      setSkillLevel(state.skillLevel);
    } else {
      // Navigate to the editProfile page
      alert("Unable to retrieve user info");
    }
  }

  async function fetchOnInit() {
    await fetchUserInfo();
    await fetchProjectIdeas();
    setIsLoading(false);
  }

  useEffect(() => {
    if (!userId) {
      alert("Please log in to view project ideas");
      navigate("/login");
      return;
    }

    fetchOnInit();
  }, []);

  const handleGenerateIdea = async () => {
    // Logic for generating new project ideas
    console.log("Generating new project ideas");

    const inputBody = {
      userId,
      programmingLanguages: languages,
      skills: [skillLevel],
      interests,
    };

    console.log(inputBody);

    try {
      const response = await fetch(`${serverUrl}/projectIdea/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputBody),
      });

      console.log(response);

      if (response.ok) {
        const data = await response.json();

        console.log(`Generated new project idea: ${JSON.stringify(data)}`);

        setProjectIdeas([...projectIdeas, data]);
      } else {
        alert("Failed to generate new project idea");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to generate new project idea");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="top-bar">
        <div className="bar-title">Projectathon</div>
        <nav className="nav-links">
          <Link to="/projectIdeas">Ideas</Link>
          <Link to="/collections">Collection</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </div>
      <button className="generate-ideas-btn" onClick={handleGenerateIdea}>
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
