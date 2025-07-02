import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import QuizManagement from "./pages/QuizManagement.jsx";
import UserManagement from "./pages/userManagement";
import CategoryManagement from "./pages/categoryManagement.jsx"; 
import AdminProfile from './pages/profile.jsx';
import QuestionManagement from "./pages/QuestionManagement.jsx";
import Reports from "./pages/reports";
import AdminHeader from "./components/adminHeader";
import Sidebar from "./components/adminSidebar";
import LoginPage from "./pages/adminLogin.jsx";
import Signup from "./pages/signup.jsx";


import "./styles/adminStyles.css";

const App = () => {
  return (
    <div className="admin-app">
      <AdminHeader />
      <div className="main-content">
        <Sidebar />
        <div className="page-content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz-management" element={<QuizManagement />} />
            <Route path="/question-management" element={<QuestionManagement />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/category-management" element={<CategoryManagement />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile" element={<AdminProfile />} />
            {/* <Route path="/parent-manager" element={<ParentManager />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
