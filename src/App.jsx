import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './AuthPage'
import UserProfile from './components/UserProfile';
import AllUsers from './pages/AllUsers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/all-users" element={<AllUsers />} />
      </Routes>
    </Router>
  )
}

export default App