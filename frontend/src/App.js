import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import EditProfilePage from './pages/EditProfilePage'
// Import other pages if you have them

function App() {
  const location = useLocation(); // This hook gives you the current location object

  return (
    <div className="App">
      <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={300}
        classNames="fade"
      >
        <Routes location={location}>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/editProfile" element={<EditProfilePage />} />
          {/* Other routes */}
        </Routes>
      </CSSTransition>
    </TransitionGroup>

    </div>
  );
}

export default App;
