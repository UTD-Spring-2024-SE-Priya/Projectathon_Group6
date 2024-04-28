import { useState, useEffect } from "react";
import { serverUrl } from "../constants";

const adminToken = "as84b99s0nss18r47bose8a08vo";

export default function AdminFeedbackPage() {
  const [loading, setLoading] = useState(true);
  const [allFeedback, setAllFeedback] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    // check "token" query to make sure the user is admin
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get("token") !== adminToken) {
      //   alert("You are not authorized to view this page.");
      setIsAdmin(false);
      setLoading(false);
      return;
    } else {
      setIsAdmin(true);
    }

    const fetchAllFeedback = async () => {
      try {
        const response = await fetch(`${serverUrl}/feedback/all`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);

          setAllFeedback(data);
        } else {
          console.error("Failed to fetch feedback");
        }
      } catch (error) {
        alert("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllFeedback();
  }, []);

  useEffect(() => {
    const fetchUsersAndIdeas = async () => {
      try {
        const usersResponse = await fetch(`${serverUrl}/user/all`);

        if (usersResponse.ok) {
          const usersData = await usersResponse.json();

          let ideas = [];
          for (let user of usersData) {
            const ideasResponse = await fetch(
              `${serverUrl}/projectIdea/${user.id}/all`
            );

            if (ideasResponse.ok) {
              const ideasData = await ideasResponse.json();
              ideas = ideas.concat(ideasData);
            } else {
              console.error("Failed to fetch ideas for user", user.id);
            }
          }

          setUsers(usersData);
          setIdeas(ideas);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        alert("Network error. Please try again.");
      }
    };

    fetchUsersAndIdeas();
  }, [allFeedback]);

  if (!isAdmin) {
    return <p>You are not authorized to view this page.</p>;
  }

  if (loading) {
    return <p>Loading feedback...</p>;
  }

  return (
    <div
      style={{
        padding: "20px",
        margin: "20px",
        border: "1px solid black",
        borderRadius: "5px",
      }}
    >
      <h1>Admin Feedback Page</h1>
      {allFeedback.map((feedback) => {
        /*
                shape of feedback object: 
                {
                    id: number,
                    userId: number,
                    ideaId: number,
                    feedback: string,
                    rating: boolean
                }
            */

        const user = users.find((user) => user.id === feedback.userId);
        const idea = ideas.find((idea) => idea.id === feedback.ideaId);

        let projectTitle = idea?.title ? idea.title : feedback.ideaId;

        // Remove "Project Title: "
        projectTitle = projectTitle.replace("Project Title: ", "");

        let userEmail = user?.email ? user.email : feedback.userId;

        return (
          <div key={feedback.id}>
            <h3>
              Feedback for Project:{" "}
              <span style={{ color: "purple" }}>{projectTitle}</span>
            </h3>
            <p>
              <span style={{ fontWeight: 600, color: "green" }}>User: </span>{" "}
              {userEmail}
            </p>
            <p>
              <span style={{ fontWeight: 600, color: "slateblue" }}>
                Feedback:{" "}
              </span>
              {feedback.feedback}
            </p>
            <p>
              <span style={{ fontWeight: 600, color: "slategray" }}>
                Rating:{" "}
              </span>{" "}
              {feedback.rating ? "Good" : "Bad"}
            </p>
          </div>
        );
      })}
    </div>
  );
}
