import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EditProfilePage from "./pages/EditProfilePage";
import ProfilePage from "./pages/ProfilePage";
import NewProjectIdeasPage from "./pages/NewProjectIdeasPage";
import FeedbackPage from "./pages/FeedbackPage";
import CollectionsPage from "./pages/CollectionsPage";
import AdminFeedbackPage from "./pages/AdminFeedbackPage";
import { UserContext } from "./state/userContext";

function App() {
  const location = useLocation();
  const [userId, setUserId] = React.useState(null);

  return (
    <div className="App">
      <TransitionGroup>
        <CSSTransition key={location.key} timeout={300} classNames="fade">
          <UserContext.Provider value={{ userId, setUserId }}>
            <Routes location={location}>
              <Route path="/" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/editProfile" element={<EditProfilePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/projectIdeas" element={<NewProjectIdeasPage />} />
              <Route path="/feedback/:projectId" element={<FeedbackPage />} />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/admin/feedback" element={<AdminFeedbackPage />} />
              {/* Other routes */}
            </Routes>
          </UserContext.Provider>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
