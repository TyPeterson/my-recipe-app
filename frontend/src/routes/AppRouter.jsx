import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import RecipeListPage from '../pages/RecipeListPage';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/recipes" element={<RecipeListPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}
